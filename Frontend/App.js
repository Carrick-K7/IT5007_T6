import React, { Component } from "react";
import { ActivityIndicator, TextInput, View, Text, Button, StyleSheet, Alert, SafeAreaView, ScrollView, StatusBar } from "react-native";
import { ApolloProvider, graphql, Mutation, Query } from "react-apollo";

import { ApolloClient, HttpLink, InMemoryCache } from "apollo-boost";
import gql from "graphql-tag";
import { red100 } from "react-native-paper/lib/typescript/styles/colors";

const client = new ApolloClient({ 
  link: new HttpLink({
    uri: 'http://192.168.0.111:3000/graphql' 
  }),
  cache: new InMemoryCache(),
});

const query = gql`
  query {
    getLength
  }
`

const deleteCustomer = gql`
  mutation deleteCustomer($customer:CustomerInput!){
    deleteCustomer(customer:$customer)
  }
`

export default class App extends Component {
  state = {
    name: '',
    type: ''
  }

  render() {
    return (
      <ApolloProvider client={client}>
        <View style={styles.container}>
          <Mutation mutation={deleteCustomer}>
            {(deleteCustomerMutation, { data }) => (
              <View>
                <TextInput
                  style={styles.input}
                  onChangeText={text => this.setState({ name: text})}
                  value={this.state.name}
                  placeholder="name"
                />
                <TextInput
                  style={styles.input}
                  onChangeText={text => this.setState({ mobile: text})}
                  value={this.state.mobile}
                  placeholder="mobile"
                />
                <Button
                  onPress={() => {
                    deleteCustomerMutation({
                      variables: {
                        customer: {
                          name: this.state.name, 
                          mobile: this.state.mobile
                        }
                      }
                    })
                      .then(res => res)
                      .catch(err => <Text>{err}</Text>)
                    this.setState({mobile: '', name: ''});
                  }}
                  title="Delete customer"
                />
                <Text style={styles.welcome}>Please check the result of deletion on the website!</Text>
              </View>
            )}
          </Mutation>
        </View>
      </ApolloProvider>
    );
  }
}

styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  input: {
    backgroundColor: '#dddddd',
    height: 50,
    margin: 20,
    paddingLeft: 10
  },
  welcome: {
    fontSize: 16,
    textAlign: 'center',
    marginTop: 50,
    color: "#FF0000"
  }
})