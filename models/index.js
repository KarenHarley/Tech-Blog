const User = require('./User');
const Post = require('./Post');
const Comments = require("./Comments")


User.hasMany(Post, {
  foreignKey: 'author',
});

Post.belongsTo(User, {
  foreignKey: 'author',
});



User.hasMany(Comments, {
  foreignKey: 'writer',
});

Comments.belongsTo(User, {
  foreignKey: 'writer',
});



Post.hasMany(Comments, {
  foreignKey: 'belongs_to_post',
});

Comments.belongsTo(Post, {
  foreignKey: 'belongs_to_post',
});




module.exports = { User,Post,Comments};