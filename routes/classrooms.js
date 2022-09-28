const express = require('express');
const { Classroom, Branche } = require('../database/models');
const { isAuthClient } = require('../config/auth')

const router = express.Router()

router.get('/', async (req, res) => {
    const { branche, grade } = req.query
    let filter = {}

    if( branche ) {
        filter.brancheId = branche
    }

    if( grade ) {
        filter.grade = grade
    }

    try {
        const classrooms = await Classroom.findAll({
            where: filter,
            attributes: { exclude: ['id', 'brancheId'] },
        })
        return res.json({ message: 'get all classrooms', isError: false, data: classrooms })
    } catch (error) {
        return res.json({ message: 'failed to execute request', isError: true, error })
    }
})

router.get('/:uuid', async (req, res) => {
    const { uuid } = req.params;

    try {
        const classroom = await Classroom.findOne({ 
            where: { uuid },
            attributes: {
                exclude: ['id', 'brancheId']
            },
            include: {
                model: Branche,
                attributes: { exclude: [ 'id' ] }
            }
        })
        return res.json({ message: 'get classroom ' + uuid, isError: false, data: classroom })
    } catch (error) {
        return res.json({ message: 'failed to execute request', isError: true, error })
    }
})

router.post('/', isAuthClient, async (req, res) => {
    const { title, grade, brancheId } = req.body;

    try {
        const classroom = await Classroom.create({ title, grade, brancheId })
        return res.json({ message: 'create classroom', isError: false, data: classroom })
    } catch (error) {
        return res.json({ message: 'failed to execute request', isError: true, error })
    }
})

router.put('/:uuid', isAuthClient, async (req, res) => {
    const { uuid } = req.params;
    const { title, grade, brancheId } = req.body;

    try {
        const classroom = await Classroom.findOne({ where: { uuid } })

        if(classroom){
            await classroom.update({ title, grade, brancheId })
        } else {
            return res.json({ message: 'failed to execute request', isError: true, error })
        }

        return res.json({ message: 'update classroom '+ uuid, isError: false, data: classroom})
    } catch (error) {
        return res.json({ message: 'failed to execute request', isError: true, error })
    }
})

router.delete('/:uuid', isAuthClient, async (req, res) => {
    const { uuid } = req.params;

    try {
        const classroom = await Classroom.findOne({ where: { uuid } })

        if(classroom){
            await classroom.destroy()
        } else {
            return res.json({ message: 'failed to execute request', isError: true, error })
        }

        return res.json({ message: 'delete classroom '+ uuid, isError: false, data: classroom })
    } catch (error) {
        return res.json({ message: 'failed to execute request', isError: true, error })
    }
})

module.exports = router;