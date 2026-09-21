import mysql2 from "mysql2";
import { Sequelize } from 'sequelize';

const sequelize = new Sequelize(
  process.env.DATABASE_URL || 'mysql://root:root@localhost:3306/tech_blog',
  {
    dialect: 'mysql',
    dialectModule: mysql2,
    logging: process.env.NODE_ENV === 'development' ? console.log : false,
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000,
    },
  }
);

export default sequelize;