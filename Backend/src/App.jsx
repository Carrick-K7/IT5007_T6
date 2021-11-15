const dateRegex = new RegExp('^\\d\\d\\d\\d-\\d\\d-\\d\\d');

function jsonDateReviver(key, value) {
  if (dateRegex.test(value)) return new Date(value);
  return value;
}

class CustomerRow extends React.Component {
  render() {
    const customer = this.props.customer;
    return (
      <tr>
        <td>{customer.name}</td>
        <td>{customer.mobile}</td>
        <td>{customer.timestamp.toDateString()}</td>
      </tr>
    );
  }
}

class CustomerTable extends React.Component {
  render() {
    const customerRows = this.props.customers.map(customer =>
      <CustomerRow key={customer.id} customer={customer} />
    );

    return (
      <table className="bordered-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Mobile</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {customerRows}
        </tbody>
      </table>
    );
  }
}

class EditCustomerForm extends React.Component {
  render() {
    return (
      <form name="editCustomer">
        <input type="text" name="name" placeholder="Name" />
        <input type="text" name="mobile" placeholder="Mobile" />
      </form>
    );
  }
}

class AddCustomer extends React.Component {
  constructor() {
    super();
    this.addCustomer = this.addCustomer.bind(this);
  }

  addCustomer(e) {
    e.preventDefault();
    const form = document.forms.editCustomer;
    const customer = {
      name: form.name.value, mobile: form.mobile.value,
    }
    this.props.createCustomer(customer);
    form.name.value = ""; form.mobile.value = "";
  }

  render() {
    return (
        <button onClick={this.addCustomer}>Add</button>
    );
  }
}

class DeleteCustomer extends React.Component {
  constructor() {
    super();
    this.deleteCustomer = this.deleteCustomer.bind(this);
  }

 deleteCustomer(e) {
    e.preventDefault();
    const form = document.forms.editCustomer;
    const customer = {
      name: form.name.value, mobile: form.mobile.value,
    }
    this.props.deleteCustomer(customer);
    form.name.value = ""; form.mobile.value = "";
  }

  render() {
    return (
      <button onClick={this.deleteCustomer}>Delete</button>
    );
  }
}

class DisplayHomepage extends React.Component {
  constructor() {
    super();
    this.home = this.home.bind(this);
  }

  home() {
    document.documentElement.scrollTop = 0;
  }

  render() {
    return (
      <button onClick={this.home}>Display Homepage</button>
    );
  }
}

class DisplayCustomers extends React.Component {
  render() {
    return (
      <div>
        <CustomerTable customers={this.props.customers}/>
      </div>
    );
  }
}

class DisplayFreeSlots extends React.Component {
  constructor() {
    super();
    this.state = {free_show: 'none', free_text: 'Display Free Slots', free_cnt: '-'};
    this.displayFree = this.displayFree.bind(this);
  }

  async displayFree() {
    if (this.state.free_show === 'none') {
      this.setState({free_show: 'block', free_text: 'Hide Free Slots'});
      const query = `query {
        getLength
      }`;
  
      const data = await graphQLFetch(query);
      if (data) {
        this.setState({ free_cnt: 25 - data.getLength });
      }
    } else {
      this.setState({free_show: 'none', free_text: 'Display Free Slots'});
    }
  }

  render() {
    return (
      <div>
        <button onClick={this.displayFree}>{this.state.free_text}</button>
        <p id="free" style={{display: this.state.free_show}}>Free Slots: {this.props.free_cnt}</p>
      </div>
    );
  }
}

async function graphQLFetch(query, variables = {}) {
  try {
    const response = await fetch('/graphql', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json'},
      body: JSON.stringify({ query, variables })
    });
    const body = await response.text();
    const result = JSON.parse(body, jsonDateReviver);

    if (result.errors) {
      const error = result.errors[0];
      if (error.extensions.code == 'BAD_USER_INPUT') {
        const details = error.extensions.exception.errors.join('\n ');
        alert(`${error.message}:\n ${details}`);
      } else {
        alert(`${error.extensions.code}: ${error.message}`);
      }
    }
    return result.data;
  } catch (e) {
    alert(`Error in sending data to server: ${e.message}`);
  }
}

class CustomerList extends React.Component {
  constructor() {
    super();
    this.state = { customers: [] };
    this.createCustomer = this.createCustomer.bind(this);
    this.deleteCustomer = this.deleteCustomer.bind(this);
  }

  componentDidMount() {
    this.loadData();
  }

  async loadData() {
    const query = `query {
      waitlist {
        id name mobile
        timestamp
      }
      getLength
    }`;

    const data = await graphQLFetch(query);
    if (data) {
      this.setState({ customers: data.waitlist, free_cnt: 25 - data.getLength});
    }
  }

  async createCustomer(customer) {
      const query = `mutation {
        addCustomer(customer:{
          name: "${customer.name}",
          mobile: "${customer.mobile}"
        }) {
          id
        }
      }`;
      
      const data = await graphQLFetch(query, { customer });
      if (data) {
        this.loadData();
      }
    }

  async deleteCustomer(customer) {
    const query = `mutation {
      deleteCustomer(customer:{
        name: "${customer.name}",
        mobile: "${customer.mobile}"
      }) 
    }`;

    const data = await graphQLFetch(query, { customer });
    if (data) {
      this.loadData();
    }
  }

  render() {
    return (
      <React.Fragment>
        <h1>Waitlist System</h1>
        <DisplayHomepage />
        <hr />
        <DisplayCustomers customers={this.state.customers} />
        <DisplayFreeSlots free_cnt={this.state.free_cnt}/>
        <hr />
        <EditCustomerForm />
        <AddCustomer createCustomer={this.createCustomer} />
        <DeleteCustomer deleteCustomer={this.deleteCustomer}/>
      </React.Fragment>
    );
  }
}

const element = <CustomerList />;

ReactDOM.render(element, document.getElementById('contents'));
