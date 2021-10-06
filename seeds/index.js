const sequelize = require('../config/connection');
const userSeeds = require('./userData');
const postSeeds = require('./postData');


const seedAll = async () => {
  await sequelize.sync({ force: true });

  

  await userSeeds();

  await postSeeds();

  process.exit(0);
};

seedAll();
