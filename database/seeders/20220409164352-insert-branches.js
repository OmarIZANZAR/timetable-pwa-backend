'use strict';

const { Branche } = require('../models')

module.exports = {
  async up (queryInterface, Sequelize) {
    await Branche.bulkCreate([
      {
        title: "software engineering and digitization",
        description: "a brief description for the software engineering and digitization branche",
        departement: "GI",
      },
    ]);
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('branches', null, {});
  }
};
