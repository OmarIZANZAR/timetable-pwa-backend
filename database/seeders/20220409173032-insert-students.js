'use strict';

const { Student } = require('../models')

module.exports = {
  async up (queryInterface, Sequelize) {
    await Student.bulkCreate([
      { 
        firstname: "izanzar",
        lastname: "omar",
        dateOfBirth: "06/06/1999",
        email: "omar.izanzar@ensem.ac.ma",
        phone: "0708661968",
        cin: "MA123456",
        dateOfEntry: "14/09/2019",
        classroomId: 1
      }
    ]);
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('students', null, {});
  }
};
