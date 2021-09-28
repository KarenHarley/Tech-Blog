const User = require('./User');
const Post = require('./Post');


User.hasMany(Post, {
  foreignKey: 'author',
});

Post.belongsTo(User, {
  foreignKey: 'author',
});

module.exports = { User,Post};