const express = require('express');
const { Op } = require('sequelize')
const { Element, Module, Teacher, Branche } = require('../database/models')
const { isAuthClient } = require('../config/auth')

const router = express.Router()

router.get('/', async (req, res) => {
    const { module, teacher, searchfor } = req.query
    let filter = {}

    if( module ) {
        filter.moduleId = module
    }

    if( teacher ) {
        filter.teacherId = teacher
    }

    if( searchfor ) {
        filter = {
            ...filter,
            title: {
                [Op.substring]: searchfor
            }
        }
    }

    try {
        const elements = await Element.findAll({
            where: filter,
            attributes: { exclude: ['id', 'moduleId', 'teacherId'] }
        })
        return res.json({ message: 'get all elements', isError: false, data: elements })
    } catch (error) {
        return res.json({ message: 'failed to execute request', isError: true, error })
    }
})

router.get('/:uuid', async (req, res) => {
    const { uuid }= req.params;

    try {
        const element = await Element.findOne({ 
            where: { uuid },
            attributes: {
                exclude: [ 'id', 'moduleId', 'teacherId' ]
            },
            include: [ 
                {
                    model: Module,
                    attributes: { exclude: [ 'id', 'brancheId' ] },
                    include: {
                        model: Branche,
                        attributes: { exclude: ['id'] },
                    }
                }, 
                {
                    model: Teacher,
                    attributes: { exclude: ['id'] },
                } 
            ]
        })
        return res.json({ message: 'get element ' + uuid, isError: false, data: element })
    } catch (error) {
        return res.json({ message: 'failed to execute request', isError: true, error })
    }
})

router.post('/', isAuthClient, async (req, res) => {
    const { title, description, coursHoursCount, tpHoursCount, moduleId, teacherId } = req.body;

    try {
        const element = await Element.create({ title, description, coursHoursCount, tpHoursCount, moduleId, teacherId })
        return res.json({ message: 'create element', isError: false, data: element })
    } catch (error) {
        return res.json({ message: 'failed to execute request', isError: true, error })
    }
})

router.put('/:uuid', isAuthClient, async (req, res) => {
    const { uuid } = req.params;
    const { title, description, coursHoursCount, tpHoursCount, moduleId, teacherId } = req.body;

    try {
        const element = await Element.findOne({ where: { uuid } })

        if(element){
            await element.update({ title, description, coursHoursCount, tpHoursCount, moduleId, teacherId })
        } else {
            return res.json({ message: 'failed to execute request', isError: true, error })
        }

        return res.json({ message: 'update element '+ uuid, isError: false, data: element})
    } catch (error) {
        return res.json({ message: 'failed to execute request', isError: true, error })
    }
})

router.delete('/:uuid', isAuthClient, async (req, res) => {
    const { uuid } = req.params;

    try {
        const element = await Element.findOne({ where: { uuid } })

        if(element){
            await element.destroy()
        } else {
            return res.json({ message: 'failed to execute request', isError: true, error })
        }

        return res.json({ message: 'delete element '+ uuid, isError: false, data: element })
    } catch (error) {
        return res.json({ message: 'failed to execute request', isError: true, error })
    }
})

module.exports = router;