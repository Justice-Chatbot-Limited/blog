export function postModel(sequelize, Sequelize) {
  try {
    sequelize.define("post", {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
      },
      userid: {
        type: Sequelize.INTEGER,
      },
      title: {
        type: Sequelize.STRING,
      },
      description: {
        type: Sequelize.STRING,
      },
    });
  } catch (err) {
    console.log(err);
  }
}
