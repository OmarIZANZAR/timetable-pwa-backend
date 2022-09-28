'use strict';

const { Element } = require('../models')

module.exports = {
  async up (queryInterface, Sequelize) {
    await Element.update(
      { teacherId: 1 },
      { where: {} }
    );
  },

  async down (queryInterface, Sequelize) {
    await Element.update(
      { teacherId: null },
      { where: {} }
    );
  }
};
