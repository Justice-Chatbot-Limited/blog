import {
  HOST,
  USER,
  PASSWORD,
  DB_NAME,
  DIALECT,
} from "../database/db.config.js";
import Sequelize from "sequelize";
import { userModel } from './userModel';
import { postModel } from './postModel';

const sequelize = new Sequelize('blogv1','root', '', {
  host: HOST,
  dialect: 'mysql',
  pool: {
    max: 10,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
});

const user = userModel(sequelize, Sequelize);
const post = postModel(sequelize, Sequelize);

sequelize.sync({ force: false }).then(() => {
  console.log(`Database & tables created here!`);
});

export {user, post};
