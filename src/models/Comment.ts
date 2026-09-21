import { DataTypes, Model } from 'sequelize';
import sequelize from '@/lib/database';


export class Comment extends Model {
  declare id: number;
  declare article_id: number;
  declare author_name: string;
  declare author_email: string;
  declare content: string;
  declare approved: boolean;
  declare created_at: Date;
}

Comment.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    article_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    author_name: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    author_email: {
      type: DataTypes.STRING(255),
      allowNull: false,
      validate: {
        isEmail: true,
      },
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    approved: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    created_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    sequelize,
    tableName: 'comments',
    timestamps: false,
  }
);


export default Comment;