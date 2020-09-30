// export function userModel(sequelize, Sequelize) {
//   try {
//     sequelize.define("user", {
//       id: {
//         type: Sequelize.INTEGER,
//         primaryKey: true,
//       },
//       username: {
//         type: Sequelize.STRING,
//       },
//       email: {
//         type: Sequelize.STRING,
//       },
//       password: {
//         type: Sequelize.STRING,
//       },
//     });
//   } catch (err) {
//     console.log(err);
//   }
// }

module.exports = (sequelize, Sequelize) => {
  const User = sequelize.define(
    'User',
    {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      username: {
        type: Sequelize.STRING
      },
      email: {
        type: Sequelize.STRING
      },
      password: {
        type: Sequelize.STRING
      }
    },
    {
      tableName: 'user'
    },
    {}
  );
  return User;
};
