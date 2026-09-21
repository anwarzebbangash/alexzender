import User from './User';
import Article from './Article';
import Subscriber from './Subscriber';
import Comment from './Comment';
import sequelize from '@/lib/database';

// Define associations (constraints: false — application-level relationship, 
// no strict database foreign key, taake hosting environment mein FK errors na aayein)
Article.belongsTo(User, {
  foreignKey: 'user_id',
  as: 'author',
  constraints: false,
});

User.hasMany(Article, {
  foreignKey: 'user_id',
  as: 'articles',
  constraints: false,
});

Comment.belongsTo(Article, {
  foreignKey: 'article_id',
  as: 'article',
  constraints: false,
});

Article.hasMany(Comment, {
  foreignKey: 'article_id',
  as: 'comments',
  constraints: false,
});

export { User, Article, Subscriber, Comment, sequelize };