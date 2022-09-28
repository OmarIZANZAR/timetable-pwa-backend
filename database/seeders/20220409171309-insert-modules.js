'use strict';

const { Module } = require('../models')

module.exports = {
  async up (queryInterface, Sequelize) {
    await Module.bulkCreate([
      { 
        title: "base de donnees reparties et multimedia",
        description: "i will do this latter",
        grade: 3,
        brancheId: 1
      },
      { 
        title: "haut debit et sys mobiles",
        description: "i will do this latter",
        grade: 3,
        brancheId: 1
      },
      { 
        title: "administration de systemes",
        description: "i will do this latter",
        grade: 3,
        brancheId: 1
      },
      { 
        title: "administration de base de donnees",
        description: "i will do this latter",
        grade: 3,
        brancheId: 1
      },
      { 
        title: "architectures des systemes a temps reel",
        description: "i will do this latter",
        grade: 3,
        brancheId: 1
      },
      { 
        title: "qualite et normalisation",
        description: "i will do this latter",
        grade: 3,
        brancheId: 1
      },
      { 
        title: "finance et management",
        description: "i will do this latter",
        grade: 3,
        brancheId: 1
      },
      { 
        title: "langues et communication",
        description: "i will do this latter",
        grade: 3,
        brancheId: 1
      },
    ]);
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('modules', null, {});
  }
};
