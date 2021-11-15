const { MongoClient } = require('mongodb');

const url = 'mongodb://localhost/waitlist';

// Atlas URL  - replace UUU with user, PPP with password, XXX with hostname
// const url = 'mongodb+srv://UUU:PPP@cluster0-XXX.mongodb.net/issuetracker?retryWrites=true';

// mLab URL - replace UUU with user, PPP with password, XXX with hostname
// const url = 'mongodb://UUU:PPP@XXX.mlab.com:33533/issuetracker';

function testWithCallbacks(callback) {
  console.log('\n--- testWithCallbacks ---');
  const client = new MongoClient(url, { useNewUrlParser: true });
  client.connect(function(err, client) {
    if (err) {
      callback(err);
      return;
    }
    console.log('Connected to MongoDB');

    const db = client.db();
    const collection = db.collection('waitlist');

    const customer = { id: 1, name: 'A. Callback', mobile: 1111, timestamp: Date.now() };
    collection.insertOne(customer, function(err, result) {
      if (err) {
        client.close();
        callback(err);
        return;
      }
      console.log('Result of insert:\n', result.insertedId);
      collection.find({ _id: result.insertedId})
        .toArray(function(err, docs) {
        if (err) {
          client.close();
          callback(err);
          return;
        }
        console.log('Result of find:\n', docs);
        client.close();
        callback(err);
      });
    });
  });
}

async function testWithAsync() {
  console.log('\n--- testWithAsync ---');
  const client = new MongoClient(url, { useNewUrlParser: true });
  try {
    await client.connect();
    console.log('Connected to MongoDB');
    const db = client.db();
    const collection = db.collection('waitlist');

    // Test for C
    const customer2 = { id: 2, name: 'B. Async', mobile: 2222, timestamp: Date.now() };
    const result2 = await collection.insertOne(customer2);
    console.log('Result of insert:\n insertedId:', result2.insertedId);
    // Test for R
    const docs2 = await collection.find({ _id: result2.insertedId })
      .toArray();
    console.log('Result of find:\n', docs2, '\n');

    // Test for U
    const result2_updated = await collection.updateOne( { _id: result2.insertedId }, { $set: {mobile: 2333}});
    console.log('Result of update: \n modifiedCount:', result2_updated.modifiedCount);
    const docs2_updated = await collection.find({ _id: result2.insertedId }).toArray();
    console.log('Result of find:\n', docs2_updated, '\n');


    // Test for D
    const result3 = await collection.deleteOne({ _id: result2.insertedId });
    console.log('Result of delete: \n deleted Count:', result3.deletedCount);
    const docs3 = await collection.find({ _id: result2.insertedId }).toArray();
    console.log('Result of find:\n', docs3);

  } catch(err) {
    console.log(err);
  } finally {
    client.close();
  }
}

testWithCallbacks(function(err) {
  if (err) {
    console.log(err);
  }
  testWithAsync();
});