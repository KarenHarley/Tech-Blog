const sequelize = require('../config/connection');
const postSeeds = require('./postData');
const userSeeds = require('./userData');

const seedAll = async () => {
  await sequelize.sync({ force: true });

  await postSeeds();

  await userSeeds();

  process.exit(0);
};

seedAll();
