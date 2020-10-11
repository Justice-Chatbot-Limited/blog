import Sequelize from 'sequelize';
import {
  HOST,
  USER,
  PASSWORD,
  DB_NAME,
  DIALECT
} from '../database/db.config.js';
import User from './userModel';
import Post from './postModel'
import { postModel } from './postModel';

const sequelize = new Sequelize('blogv1', 'root', '', {
  host: HOST,
  dialect: 'mysql',
  pool: {
    max: 10,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
});

const user = User(sequelize, Sequelize);
const post = Post(sequelize, Sequelize);

sequelize.sync({ force: false }).then(() => {
  console.log('Database & tables created here!');
});

export { user, post };
