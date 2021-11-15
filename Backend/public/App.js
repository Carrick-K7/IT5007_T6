"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

var dateRegex = new RegExp('^\\d\\d\\d\\d-\\d\\d-\\d\\d');

function jsonDateReviver(key, value) {
  if (dateRegex.test(value)) return new Date(value);
  return value;
}

var CustomerRow = /*#__PURE__*/function (_React$Component) {
  _inherits(CustomerRow, _React$Component);

  var _super = _createSuper(CustomerRow);

  function CustomerRow() {
    _classCallCheck(this, CustomerRow);

    return _super.apply(this, arguments);
  }

  _createClass(CustomerRow, [{
    key: "render",
    value: function render() {
      var customer = this.props.customer;
      return /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("td", null, customer.name), /*#__PURE__*/React.createElement("td", null, customer.mobile), /*#__PURE__*/React.createElement("td", null, customer.timestamp.toDateString()));
    }
  }]);

  return CustomerRow;
}(React.Component);

var CustomerTable = /*#__PURE__*/function (_React$Component2) {
  _inherits(CustomerTable, _React$Component2);

  var _super2 = _createSuper(CustomerTable);

  function CustomerTable() {
    _classCallCheck(this, CustomerTable);

    return _super2.apply(this, arguments);
  }

  _createClass(CustomerTable, [{
    key: "render",
    value: function render() {
      var customerRows = this.props.customers.map(function (customer) {
        return /*#__PURE__*/React.createElement(CustomerRow, {
          key: customer.id,
          customer: customer
        });
      });
      return /*#__PURE__*/React.createElement("table", {
        className: "bordered-table"
      }, /*#__PURE__*/React.createElement("thead", null, /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("th", null, "Name"), /*#__PURE__*/React.createElement("th", null, "Mobile"), /*#__PURE__*/React.createElement("th", null, "Date"))), /*#__PURE__*/React.createElement("tbody", null, customerRows));
    }
  }]);

  return CustomerTable;
}(React.Component);

var EditCustomerForm = /*#__PURE__*/function (_React$Component3) {
  _inherits(EditCustomerForm, _React$Component3);

  var _super3 = _createSuper(EditCustomerForm);

  function EditCustomerForm() {
    _classCallCheck(this, EditCustomerForm);

    return _super3.apply(this, arguments);
  }

  _createClass(EditCustomerForm, [{
    key: "render",
    value: function render() {
      return /*#__PURE__*/React.createElement("form", {
        name: "editCustomer"
      }, /*#__PURE__*/React.createElement("input", {
        type: "text",
        name: "name",
        placeholder: "Name"
      }), /*#__PURE__*/React.createElement("input", {
        type: "text",
        name: "mobile",
        placeholder: "Mobile"
      }));
    }
  }]);

  return EditCustomerForm;
}(React.Component);

var AddCustomer = /*#__PURE__*/function (_React$Component4) {
  _inherits(AddCustomer, _React$Component4);

  var _super4 = _createSuper(AddCustomer);

  function AddCustomer() {
    var _this;

    _classCallCheck(this, AddCustomer);

    _this = _super4.call(this);
    _this.addCustomer = _this.addCustomer.bind(_assertThisInitialized(_this));
    return _this;
  }

  _createClass(AddCustomer, [{
    key: "addCustomer",
    value: function addCustomer(e) {
      e.preventDefault();
      var form = document.forms.editCustomer;
      var customer = {
        name: form.name.value,
        mobile: form.mobile.value
      };
      this.props.createCustomer(customer);
      form.name.value = "";
      form.mobile.value = "";
    }
  }, {
    key: "render",
    value: function render() {
      return /*#__PURE__*/React.createElement("button", {
        onClick: this.addCustomer
      }, "Add");
    }
  }]);

  return AddCustomer;
}(React.Component);

var DeleteCustomer = /*#__PURE__*/function (_React$Component5) {
  _inherits(DeleteCustomer, _React$Component5);

  var _super5 = _createSuper(DeleteCustomer);

  function DeleteCustomer() {
    var _this2;

    _classCallCheck(this, DeleteCustomer);

    _this2 = _super5.call(this);
    _this2.deleteCustomer = _this2.deleteCustomer.bind(_assertThisInitialized(_this2));
    return _this2;
  }

  _createClass(DeleteCustomer, [{
    key: "deleteCustomer",
    value: function deleteCustomer(e) {
      e.preventDefault();
      var form = document.forms.editCustomer;
      var customer = {
        name: form.name.value,
        mobile: form.mobile.value
      };
      this.props.deleteCustomer(customer);
      form.name.value = "";
      form.mobile.value = "";
    }
  }, {
    key: "render",
    value: function render() {
      return /*#__PURE__*/React.createElement("button", {
        onClick: this.deleteCustomer
      }, "Delete");
    }
  }]);

  return DeleteCustomer;
}(React.Component);

var DisplayHomepage = /*#__PURE__*/function (_React$Component6) {
  _inherits(DisplayHomepage, _React$Component6);

  var _super6 = _createSuper(DisplayHomepage);

  function DisplayHomepage() {
    var _this3;

    _classCallCheck(this, DisplayHomepage);

    _this3 = _super6.call(this);
    _this3.home = _this3.home.bind(_assertThisInitialized(_this3));
    return _this3;
  }

  _createClass(DisplayHomepage, [{
    key: "home",
    value: function home() {
      document.documentElement.scrollTop = 0;
    }
  }, {
    key: "render",
    value: function render() {
      return /*#__PURE__*/React.createElement("button", {
        onClick: this.home
      }, "Display Homepage");
    }
  }]);

  return DisplayHomepage;
}(React.Component);

var DisplayCustomers = /*#__PURE__*/function (_React$Component7) {
  _inherits(DisplayCustomers, _React$Component7);

  var _super7 = _createSuper(DisplayCustomers);

  function DisplayCustomers() {
    _classCallCheck(this, DisplayCustomers);

    return _super7.apply(this, arguments);
  }

  _createClass(DisplayCustomers, [{
    key: "render",
    value: function render() {
      return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(CustomerTable, {
        customers: this.props.customers
      }));
    }
  }]);

  return DisplayCustomers;
}(React.Component);

var DisplayFreeSlots = /*#__PURE__*/function (_React$Component8) {
  _inherits(DisplayFreeSlots, _React$Component8);

  var _super8 = _createSuper(DisplayFreeSlots);

  function DisplayFreeSlots() {
    var _this4;

    _classCallCheck(this, DisplayFreeSlots);

    _this4 = _super8.call(this);
    _this4.state = {
      free_show: 'none',
      free_text: 'Display Free Slots',
      free_cnt: '-'
    };
    _this4.displayFree = _this4.displayFree.bind(_assertThisInitialized(_this4));
    return _this4;
  }

  _createClass(DisplayFreeSlots, [{
    key: "displayFree",
    value: function () {
      var _displayFree = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
        var query, data;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                if (!(this.state.free_show === 'none')) {
                  _context.next = 9;
                  break;
                }

                this.setState({
                  free_show: 'block',
                  free_text: 'Hide Free Slots'
                });
                query = "query {\n        getLength\n      }";
                _context.next = 5;
                return graphQLFetch(query);

              case 5:
                data = _context.sent;

                if (data) {
                  this.setState({
                    free_cnt: 25 - data.getLength
                  });
                }

                _context.next = 10;
                break;

              case 9:
                this.setState({
                  free_show: 'none',
                  free_text: 'Display Free Slots'
                });

              case 10:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function displayFree() {
        return _displayFree.apply(this, arguments);
      }

      return displayFree;
    }()
  }, {
    key: "render",
    value: function render() {
      return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("button", {
        onClick: this.displayFree
      }, this.state.free_text), /*#__PURE__*/React.createElement("p", {
        id: "free",
        style: {
          display: this.state.free_show
        }
      }, "Free Slots: ", this.props.free_cnt));
    }
  }]);

  return DisplayFreeSlots;
}(React.Component);

function graphQLFetch(_x) {
  return _graphQLFetch.apply(this, arguments);
}

function _graphQLFetch() {
  _graphQLFetch = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5(query) {
    var variables,
        response,
        body,
        result,
        error,
        details,
        _args5 = arguments;
    return regeneratorRuntime.wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            variables = _args5.length > 1 && _args5[1] !== undefined ? _args5[1] : {};
            _context5.prev = 1;
            _context5.next = 4;
            return fetch('/graphql', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify({
                query: query,
                variables: variables
              })
            });

          case 4:
            response = _context5.sent;
            _context5.next = 7;
            return response.text();

          case 7:
            body = _context5.sent;
            result = JSON.parse(body, jsonDateReviver);

            if (result.errors) {
              error = result.errors[0];

              if (error.extensions.code == 'BAD_USER_INPUT') {
                details = error.extensions.exception.errors.join('\n ');
                alert("".concat(error.message, ":\n ").concat(details));
              } else {
                alert("".concat(error.extensions.code, ": ").concat(error.message));
              }
            }

            return _context5.abrupt("return", result.data);

          case 13:
            _context5.prev = 13;
            _context5.t0 = _context5["catch"](1);
            alert("Error in sending data to server: ".concat(_context5.t0.message));

          case 16:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5, null, [[1, 13]]);
  }));
  return _graphQLFetch.apply(this, arguments);
}

var CustomerList = /*#__PURE__*/function (_React$Component9) {
  _inherits(CustomerList, _React$Component9);

  var _super9 = _createSuper(CustomerList);

  function CustomerList() {
    var _this5;

    _classCallCheck(this, CustomerList);

    _this5 = _super9.call(this);
    _this5.state = {
      customers: []
    };
    _this5.createCustomer = _this5.createCustomer.bind(_assertThisInitialized(_this5));
    _this5.deleteCustomer = _this5.deleteCustomer.bind(_assertThisInitialized(_this5));
    return _this5;
  }

  _createClass(CustomerList, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      this.loadData();
    }
  }, {
    key: "loadData",
    value: function () {
      var _loadData = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
        var query, data;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                query = "query {\n      waitlist {\n        id name mobile\n        timestamp\n      }\n      getLength\n    }";
                _context2.next = 3;
                return graphQLFetch(query);

              case 3:
                data = _context2.sent;

                if (data) {
                  this.setState({
                    customers: data.waitlist,
                    free_cnt: 25 - data.getLength
                  });
                }

              case 5:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function loadData() {
        return _loadData.apply(this, arguments);
      }

      return loadData;
    }()
  }, {
    key: "createCustomer",
    value: function () {
      var _createCustomer = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(customer) {
        var query, data;
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                query = "mutation {\n        addCustomer(customer:{\n          name: \"".concat(customer.name, "\",\n          mobile: \"").concat(customer.mobile, "\"\n        }) {\n          id\n        }\n      }");
                _context3.next = 3;
                return graphQLFetch(query, {
                  customer: customer
                });

              case 3:
                data = _context3.sent;

                if (data) {
                  this.loadData();
                }

              case 5:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));

      function createCustomer(_x2) {
        return _createCustomer.apply(this, arguments);
      }

      return createCustomer;
    }()
  }, {
    key: "deleteCustomer",
    value: function () {
      var _deleteCustomer = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(customer) {
        var query, data;
        return regeneratorRuntime.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                query = "mutation {\n      deleteCustomer(customer:{\n        name: \"".concat(customer.name, "\",\n        mobile: \"").concat(customer.mobile, "\"\n      }) \n    }");
                _context4.next = 3;
                return graphQLFetch(query, {
                  customer: customer
                });

              case 3:
                data = _context4.sent;

                if (data) {
                  this.loadData();
                }

              case 5:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4, this);
      }));

      function deleteCustomer(_x3) {
        return _deleteCustomer.apply(this, arguments);
      }

      return deleteCustomer;
    }()
  }, {
    key: "render",
    value: function render() {
      return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("h1", null, "Waitlist System"), /*#__PURE__*/React.createElement(DisplayHomepage, null), /*#__PURE__*/React.createElement("hr", null), /*#__PURE__*/React.createElement(DisplayCustomers, {
        customers: this.state.customers
      }), /*#__PURE__*/React.createElement(DisplayFreeSlots, {
        free_cnt: this.state.free_cnt
      }), /*#__PURE__*/React.createElement("hr", null), /*#__PURE__*/React.createElement(EditCustomerForm, null), /*#__PURE__*/React.createElement(AddCustomer, {
        createCustomer: this.createCustomer
      }), /*#__PURE__*/React.createElement(DeleteCustomer, {
        deleteCustomer: this.deleteCustomer
      }));
    }
  }]);

  return CustomerList;
}(React.Component);

var element = /*#__PURE__*/React.createElement(CustomerList, null);
ReactDOM.render(element, document.getElementById('contents'));