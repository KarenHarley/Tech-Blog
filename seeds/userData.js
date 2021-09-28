const { User } = require('../models');

const userData = [
  {
    username: 'bob132',
   password: "Bobby3453"
  },
  {
    username: 'harleyRacer457',
   password: "harleyGoesFast"
  },
  {
    username: 'NerdKnows',
   password: "JoIsSmarterThanYou56"
  },
  {
    username: 'BarbiePrincessCodes',
   password: "iAmPerfectInEveryWay"
  },
];

const userSeeds = () => User.bulkCreate(userData);

module.exports = userSeeds;