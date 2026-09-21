import User from './User';
import Article from './Article';
import Subscriber from './Subscriber';
import Comment from './Comment';
import sequelize from '@/lib/database';



User.hasMany(Article, {
  foreignKey: 'user_id',
  as: 'articles',
});

Comment.belongsTo(Article, {
  foreignKey: 'article_id',
  as: 'article',
});

Article.hasMany(Comment, {
  foreignKey: 'article_id',
  as: 'comments',
});

export { User, Article, Subscriber, Comment, sequelize };