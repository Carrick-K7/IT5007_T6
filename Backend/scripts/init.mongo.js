/*
 * Run using the mongo shell. For remote databases, ensure that the
 * connection string is supplied in the command line. For example:
 * localhost:
 *   mongo issuetracker scripts/init.mongo.js
 * Atlas:
 *   mongo mongodb+srv://user:pwd@xxx.mongodb.net/issuetracker scripts/init.mongo.js
 * MLab:
 *   mongo mongodb://user:pwd@xxx.mlab.com:33533/issuetracker scripts/init.mongo.js
 */

db.waitlist.remove({});

const waitlistDB = [
    {
        id: 1, name: 'Carrick', mobile: 88008800,
        timestamp: new Date('2021-09-30'), 
      },
    {
        id: 2, name: 'Eric', mobile: 88111111,
        timestamp: new Date('2021-10-01')
    },
];

db.waitlist.insertMany(waitlistDB);
const count = db.waitlist.count();
print('Inserted', count, 'customers');

db.counters.remove({ _id: 'waitlist' });
db.counters.insert({ _id: 'waitlist', current: count });

db.waitlist.createIndex({ id: 1 }, { unique: true });
db.waitlist.createIndex({ name: 1 });
db.waitlist.createIndex({ mobile: 1 });
db.waitlist.createIndex({ timestamp: 1 });