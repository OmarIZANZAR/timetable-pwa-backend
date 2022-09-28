'use strict';

const { Classroom } = require('../models')

module.exports = {
  async up (queryInterface, Sequelize) {
    await Classroom.bulkCreate([
      { 
        title: "class one",
        grade: 3,
        brancheId: 1,
      }
    ]);
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('classrooms', null, {});
  }
};
