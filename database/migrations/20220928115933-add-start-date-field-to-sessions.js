'use strict';

module.exports = {
  async up (queryInterface, DataTypes) {
    await queryInterface.addColumn('sessions', 'start_date', { 
      type: DataTypes.DATEONLY,
      allowNull: false,
    });
  },

  async down (queryInterface, DataTypes) {
    await queryInterface.removeColumn('sessions', 'start_date');
  }
};
