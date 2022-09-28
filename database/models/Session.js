'use strict';

const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class Session extends Model {
        static associate(models) {
            this.belongsTo(models.Element, {
                foreignKey: 'elementId'
            })

            this.belongsTo(models.Classroom, {
                foreignKey: 'classroomId'
            })
        }
    }

    Session.init({
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
        startDate: {
            type: DataTypes.DATEONLY,
            allowNull: false,
        },
        startWeek: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                min: 1,
                max: 44,
            }
        },
        endWeek: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                min: 1,
                max: 44,
            }
        },
        day: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                min: 1,
                max: 6,
            }
        },
        startTime: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                min: 8,
                max: 18,
            }
        },
        endTime: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                min: 9,
                max: 18,
            }
        },
        isTp: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false,
        },
        elementId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        classroomId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        }
    }, {
        sequelize,
        modelName: 'Session',
        tableName: 'sessions',
        underscored: true
    });

    return Session;
};
