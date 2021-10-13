const Sequelize = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(
  "heroku_d78bb8d2e415694",
  "b142ae9a3c09de",
  "63203f3a",
  {
    host: 'us-cdbr-east-04.cleardb.com',
    dialect: 'mysql',
    port: 3306,
  }
);

module.exports = sequelize;
