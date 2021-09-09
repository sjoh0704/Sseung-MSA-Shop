const Sequelize = require('sequelize');
const Post = require('./post');
const Comment = require('./comment');
// const Auction = require('./auction');

const env = process.env.NODE_ENV || 'development';
const config = require('../config/config')[env];
const db = {};

const sequelize = new Sequelize(
    config.database,
    config.username,
    config.password,
    config
);

db.sequelize = sequelize;
db.Post = Post;
db.Comment = Comment;

Post.init(sequelize);
Comment.init(sequelize);

Post.associate(db);
Comment.associate(db);

module.exports = db;
