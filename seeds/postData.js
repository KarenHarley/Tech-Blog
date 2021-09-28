const { Post } = require('../models');

const postData = [
  {
    title: 'Why MVC is so inportant',
   content: "MVC allows developers to maintain a true separation of concerns,devising their code between the Model layer for data, the View layer for design, and the Controller layer for application logic",
   author: 1,
  },
  {
    title: 'Authentication vs Authorization',
   content: "Authentication confirms that users are who they say they are. Authorization gives those users permission to access a resource.",
   author: 2,
  },
  {
    title: 'What is Object–relational mapping?',
   content: "Object–relational mapping (ORM, O/RM, and O/R mapping tool) in computer science is a programming technique for converting data between incompatible type systems using object-oriented programming languages. This creates, in effect, a 'virtual object database' that can be used from within the programming language.",
   author: 4,
  },
  {
    title: 'Why Sequelize is helpful',
   content: "Basically Sequelize. js has good support for database synchronization, eager loading, associations, transactions and migrations. Another main advantage of Sequelize. js is it easy to test.",
   author: 3,
  },
];

const postSeeds = () => Post.bulkCreate(postData);

module.exports = postSeeds;