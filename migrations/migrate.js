
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.changeColumn('users', 'hashedApi', {
      type: Sequelize.BINARY
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.changeColumn('users', 'hashedApi', {
      type: Sequelize.STRING
    });
  }
};
