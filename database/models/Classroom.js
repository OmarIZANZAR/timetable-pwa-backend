'use strict';

const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class Classroom extends Model {
        static associate(models) {
            this.hasMany(models.Student, {
                foreignKey: 'classroomId'
            });

            this.belongsTo(models.Branche, {
                foreignKey: 'brancheId'
            })

            this.hasMany(models.Session, {
                foreignKey: 'classroomId'
            });
        }
    }

    Classroom.init({
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
        grade: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 1,
            validate: {
                min: 1,
                max: 3
            }
        },
        brancheId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        }
    }, {
        sequelize,
        modelName: 'Classroom',
        tableName: 'classrooms',
        underscored: true,
    });

    return Classroom;
};
