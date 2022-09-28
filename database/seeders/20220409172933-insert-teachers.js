'use strict';

const { Teacher } = require('../models')

module.exports = {
  async up (queryInterface, Sequelize) {
    await Teacher.bulkCreate([
      { 
        firstname: "teach",
        lastname: "atrbd",
        email: "teach.atrbd@ensem.ac.ma",
        phone: "0712345678"
      }
    ]);
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('teachers', null, {});
  }
};
