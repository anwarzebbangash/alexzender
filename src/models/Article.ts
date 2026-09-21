import { DataTypes, Model } from "sequelize";
import sequelize from "@/lib/database";

export class Article extends Model {
  declare id: number;
  declare title: string;
  declare slug: string;
  declare content: string;
  declare description: string;
  declare category: string;
  declare tags: string[];
  declare featured_image: string;
  declare views: number;
  declare published_at: Date | null;
  declare created_at: Date;
  declare updated_at: Date;
  declare user_id: number;
}

Article.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    title: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    slug: {
      type: DataTypes.STRING(255),
      allowNull: false,
      unique: true,
    },
    content: {
      type: DataTypes.TEXT("long"),
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING(500),
      allowNull: true,
    },
    category: {
      type: DataTypes.ENUM(
        "backend",
        "frontend",
        "ai-ml",
        "devops",
        "database",
        "other",
      ),
      defaultValue: "other",
    },
    tags: {
      type: DataTypes.JSON,
      defaultValue: [],
    },
    featured_image: {
      type: DataTypes.STRING(500),
      allowNull: true,
    },
    views: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    published_at: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    created_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    updated_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: "articles",
    timestamps: true,
    underscored: true,
  },
);

export default Article;
