'use strict';

const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class Branche extends Model {
        static associate(models) {
            this.hasMany(models.Classroom, {
                foreignKey: 'brancheId'
            })

            this.hasMany(models.Module, {
                foreignKey: 'brancheId'
            })
        }
    }

    Branche.init({
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true,
        },
        uuid: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            allowNull: false,
            unique: true,
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        description: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
        departement: {
            type: DataTypes.STRING,
            allowNull: false
        },
    }, {
        sequelize,
        modelName: 'Branche',
        tableName: 'branches',
        underscored: true,
    });

    return Branche;
};
