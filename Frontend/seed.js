const request = require('request-promise');
const President = require('./model');

const seed = () => {
  request('https://mysafeinfo.com/api/data?list=presidents&format=json')
    .then(res => JSON.parse(res))
    .then((res) => {
      const data = res.map((r) => {
        const obj = {};
        obj.name = r.FullName;
        obj.party = r.Party;
        obj.term = r.Term;
        return obj;
      });
      data.forEach((d) => {
        const president = new President(d);
        president.save((err, item) => {
          console.log('saved:', item);
        });
      });
    })
    .catch((err) => {
      console.log('err:', err);
    });
};

module.exports = seed;
