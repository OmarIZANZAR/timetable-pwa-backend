'use strict';

const { Branche } = require('../models')

module.exports = {
  async up (queryInterface, Sequelize) {
    await Branche.bulkCreate([
      { 
        title: "networking and databases",
        description: "tech stuff and others...",
        departement: "computer engineering",
      },
      {
        title: "software engineering and digitization",
        description: "new tech stuff and others...",
        departement: "software engineering and digitization",
      },
    ]);
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('branches', null, {});
  }
};
