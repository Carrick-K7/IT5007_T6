const fs = require('fs');
const express = require('express');
const { ApolloServer, UserInputError } = require('apollo-server-express');
const { GraphQLScalarType } = require('graphql');
const { Kind } = require('graphql/language');
const { MongoClient } = require('mongodb');

const url = 'mongodb://localhost/waitlist';

let db;

let aboutMessage = "Waitlist API v1.0";

const GraphQLDate = new GraphQLScalarType({
  name: 'GraphQLDate',
  description: 'A Date() type in GraphQL as a scalar',
  serialize(value) {
    return value.toISOString();
  },
  parseValue(value) {
    const dateValue = new Date(value);
    return isNaN(dateValue) ? undefined : dateValue;
  },
  parseLiteral(ast) {
    if (ast.kind == Kind.STRING) {
      const value = new Date(ast.value);
      return isNaN(value) ? undefined : value;
    }
  },
});

const resolvers = {
  Query: {
    about: () => aboutMessage,
    waitlist,
    getLength
  },
  Mutation: {
    setAboutMessage,
    addCustomer,
    deleteCustomer
  },
  GraphQLDate,
};

function setAboutMessage(_, { message }) {
  return aboutMessage = message;
}

async function waitlist() {
  const customers = await db.collection('waitlist').find({}).toArray();
  return customers;
}

async function getLength() {
  const count = await db.collection('waitlist').count();
  return count;
}

async function ifExisted(_, { customer }) {
  const ifExisted = await db.collection('waitlist').findOne({name: customer.name, mobile: customer.mobile});
  return ifExisted;
}

async function getNextSequence(name) {
  const result = await db.collection('counters').findOneAndUpdate(
    { _id: name },
    { $inc: { current: 1 } },
    { returnOriginal: false },
  );
  return result.value.current;
}

async function addCustomer(_, { customer }) {
  const count = await getLength();
  if (count >= 5) {
    throw new Error('No free slots!');
  } else {
    customer.id = await getNextSequence('waitlist');
    customer.timestamp = new Date();

    const ifExisted = await db.collection('waitlist').findOne({ name: customer.name, mobile: customer.mobile })
    if (ifExisted) {
      throw new Error('User existed!')
    }
    const result = await db.collection('waitlist').insertOne(customer)
    const savedCustomer = await db.collection('waitlist').
      findOne({_id: result.insertedId})
    return savedCustomer;
  }
}

async function deleteCustomer(_, { customer }) {
  const ifExisted = await db.collection('waitlist').findOne({ name: customer.name, mobile: customer.mobile })
  if (!ifExisted) {
    throw new Error('User not found!')
  } else {
    const result = await db.collection('waitlist').deleteOne({ id: ifExisted.id });
    return 'Delete successful!'
  }
}

async function connectToDb() {
  const client = new MongoClient(url, { useNewUrlParser: true });
  await client.connect();
  console.log('Connected to MongoDB at', url);
  db = client.db();
}

const server = new ApolloServer({
  typeDefs: fs.readFileSync('./server/schema.graphql', 'utf-8'),
  resolvers,
  formatError: error => {
    console.log(error);
    return error;
  },
});

const app = express();

app.use(express.static('public'));

server.applyMiddleware({ app, path: '/graphql' });

(async function () {
  try {
    await connectToDb();
    app.listen(3000, function () {
      console.log('App started on port 3000');
    });
  } catch (err) {
    console.log('ERROR:', err);
  }
})();
