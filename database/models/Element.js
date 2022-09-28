'use strict';

const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class Element extends Model {
        static associate(models) {
            this.belongsTo(models.Module, {
                foreignKey: 'moduleId'
            })

            this.belongsTo(models.Teacher, {
                foreignKey: 'teacherId',
            })

            this.hasMany(models.Session, {
                foreignKey: 'elementId'
            });
        }
    }

    Element.init({
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
        coursHoursCount: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                min: 0
            }
        },
        tpHoursCount: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                min: 0
            }
        },
        moduleId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        teacherId: {
            type: DataTypes.INTEGER,
            allowNull: true,
        }
    }, {
        sequelize,
        modelName: 'Element',
        tableName: 'elements',
        underscored: true
    });

    return Element;
};
