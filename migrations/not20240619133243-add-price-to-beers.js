'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('Beers', 'price', {
      type: Sequelize.FLOAT,
      allowNull: false,
      validate: {
        min: 0,
        max: 1000000
      }
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('Beers', 'price');
  }
};
