const express = require('express');
const { Op } = require('sequelize')
const { Teacher } = require('../database/models')
const { isAuthClient } = require('../config/auth')

const router = express.Router()

router.get('/', async (req, res) => {
    const { searchfor } = req.query
    let filter = {}

    if( searchfor ) {
        filter[Op.or] = [
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
        const teachers = await Teacher.findAll({
            where: filter,
            attributes: { exclude: [ 'id' ] }
        })
        return res.json({ message: 'get all teachers', isError: false, data: teachers })
    } catch (error) {
        return res.json({ message: 'failed to execute request', isError: true, error })
    }
})

router.get('/:uuid', async (req, res) => {
    const { uuid }= req.params;

    try {
        const teacher = await Teacher.findOne({ 
            where: { uuid },
            attributes: { exclude: [ 'id' ] }
        })
        return res.json({ message: 'get teacher ' + uuid, isError: false, data: teacher })
    } catch (error) {
        return res.json({ message: 'failed to execute request', isError: true, error })
    }
})

router.post('/', isAuthClient, async (req, res) => {
    const { firstname, lastname, email, phone } = req.body;

    try {
        const teacher = await Teacher.create({ firstname, lastname, email, phone })
        return res.json({ message: 'create teacher', isError: false, data: teacher })
    } catch (error) {
        return res.json({ message: 'failed to execute request', isError: true, error })
    }
})

router.put('/:uuid', isAuthClient, async (req, res) => {
    const { uuid } = req.params;
    const { firstname, lastname, email, phone } = req.body;

    try {
        const teacher = await Teacher.findOne({ where: { uuid } })

        if(teacher){
            await teacher.update({ firstname, lastname, email, phone })
        } else {
            return res.json({ message: 'failed to execute request', isError: true, error })
        }

        return res.json({ message: 'update teacher '+ uuid, isError: false, data: teacher})
    } catch (error) {
        return res.json({ message: 'failed to execute request', isError: true, error })
    }
})

router.delete('/:uuid', isAuthClient, async (req, res) => {
    const { uuid } = req.params;

    try {
        const teacher = await Teacher.findOne({ where: { uuid } })

        if(teacher){
            await teacher.destroy()
        } else {
            return res.json({ message: 'failed to execute request', isError: true, error })
        }

        return res.json({ message: 'delete teacher '+ uuid, isError: false, data: teacher })
    } catch (error) {
        return res.json({ message: 'failed to execute request', isError: true, error })
    }
})

module.exports = router;