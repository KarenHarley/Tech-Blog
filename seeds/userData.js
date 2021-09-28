const { User } = require('../models');

const userData = [
  {
    username: 'bob132',
   password: "Bobby3453"
  },
  {
    title: 'harleyRacer457',
   password: "harleyGoesFast"
  },
  {
    title: 'NerdKnows',
   password: "JoIsSmarterThanYou56"
  },
  {
    title: 'BarbiePrincessCodes',
   password: "iAmPerfectInEveryWay"
  },
];

const userSeeds = () => User.bulkCreate(userData);

module.exports = userSeeds;