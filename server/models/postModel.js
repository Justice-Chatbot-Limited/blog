module.exports = (sequelize, Sequelize) => {
  const Post = sequelize.define(
    'Post',
    {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      userid: {
        type: Sequelize.INTEGER
      },
      title: {
        type: Sequelize.STRING
      },
      description: {
        type: Sequelize.STRING
      }
    },
    {
      tableName: 'post'
    },
    {}
  );
  return Post;
};
