const express = require('express');
const { Op } = require('sequelize')
const { Student, Classroom, Branche } = require('../database/models');
const { isAuthClient } = require('../config/auth')

const router = express.Router()

router.get('/', async (req, res) => {
    const { classroom, searchfor } = req.query
    let filter = {}

    if( classroom ) {
        filter.classroomId = classroom
    }

    if( searchfor ) {
        filter[Op.or] =  [
            {
                firstname: {
                    [Op.substring]: searchfor
                }
            },
            {
                lastname: {
                    [Op.substring]: searchfor
                }
            },
            {
                phone: {
                    [Op.substring]: searchfor
                }
            }
        ]
    }

    try {
        const students = await Student.findAll({
            where: filter,
            attributes: { exclude: [ 'id' ] }
        })
        return res.json({ message: 'get all students', isError: false, data: students })
    } catch (error) {
        return res.json({ message: 'failed to execute request', isError: true, error })
    }
})

router.get('/:uuid', async (req, res) => {
    const { uuid } = req.params;

    try {
        const student = await Student.findOne({ 
            where: { uuid },
            attributes: {
                exclude: ['id', 'classroomId']
            },
            include: [
                {
                    model: Classroom,
                    attributes: {
                        exclude: ['id', 'brancheId']
                    },
                    include: {
                        model: Branche,
                        attributes: { exclude: [ 'id' ] }
                    }
                }
            ]
        })
        return res.json({ message: 'get student ' + uuid, isError: false, data: student })
    } catch (error) {
        return res.json({ message: 'failed to execute request', isError: true, error })
    }
})

router.post('/', isAuthClient, async (req, res) => {
    const { firstname, lastname, dateOfBirth, email, phone, cin, dateOfEntry, classroomId } = req.body;

    try {
        const student = await Student.create({ firstname, lastname, dateOfBirth, email, phone, cin, dateOfEntry, classroomId })
        return res.json({ message: 'create student', isError: false, data: student })
    } catch (error) {
        return res.json({ message: 'failed to execute request', isError: true, error })
    }
})

router.put('/:uuid', isAuthClient, async (req, res) => {
    const { uuid } = req.params;
    const { firstname, lastname, dateOfBirth, email, phone, cin, dateOfEntry, classroomId } = req.body;

    try {
        const student = await Student.findOne({ where: { uuid } })

        if(student){
            await student.update({ firstname, lastname, dateOfBirth, email, phone, cin, dateOfEntry, classroomId })
        } else {
            return res.json({ message: 'failed to execute request', isError: true, error })
        }

        return res.json({ message: 'update student '+ uuid, isError: false, data: student})
    } catch (error) {
        return res.json({ message: 'failed to execute request', isError: true, error })
    }
})

router.delete('/:uuid', isAuthClient, async (req, res) => {
    const { uuid } = req.params;

    try {
        const student = await Student.findOne({ where: { uuid } })

        if(student){
            await student.destroy()
        } else {
            return res.json({ message: 'failed to execute request', isError: true, error })
        }

        return res.json({ message: 'delete student '+ uuid, isError: false, data: student })
    } catch (error) {
        return res.json({ message: 'failed to execute request', isError: true, error })
    }
})

module.exports = router;