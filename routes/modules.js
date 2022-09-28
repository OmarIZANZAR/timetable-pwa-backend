const express = require('express');
const { Op } = require('sequelize')
const { Module, Branche } = require('../database/models')
const { isAuthClient } = require('../config/auth')

const router = express.Router()

router.get('/', async (req, res) => {
    const { grade, branche, searchfor } = req.query
    let filter = {}

    if( grade ) {
        filter.grade = grade
    }

    if( branche ) {
        filter.brancheId = branche
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
        const modules = await Module.findAll({
            where: filter,
            attributes: { exclude: ['id', 'brancheId'] }
        })
        return res.json({ message: 'get all modules', isError: false, data: modules })
    } catch (error) {
        return res.json({ message: 'failed to execute request', isError: true, error })
    }
})

router.get('/:uuid', async (req, res) => {
    const { uuid } = req.params;

    try {
        const module = await Module.findOne({ 
            where: { uuid },
            attributes: {
                exclude: ['id', 'brancheId']
            },
            include: {
                model: Branche,
                attributes: { exclude: ['id'] }
            },
        })
        return res.json({ message: 'get module ' + uuid, isError: false, data: module })
    } catch (error) {
        return res.json({ message: 'failed to execute request', isError: true, error })
    }
})

router.post('/', isAuthClient, async (req, res) => {
    const { title, description, grade, brancheId } = req.body;

    try {
        const module = await Module.create({ title, description, grade, brancheId })
        return res.json({ message: 'create module', isError: false, data: module })
    } catch (error) {
        return res.json({ message: 'failed to execute request', isError: true, error })
    }
})

router.put('/:uuid', isAuthClient, async (req, res) => {
    const { uuid } = req.params;
    const { title, description, grade, brancheId } = req.body;

    try {
        const module = await Module.findOne({ where: { uuid } })

        if(module){
            await module.update({ title, description, grade, brancheId })
        } else {
            return res.json({ message: 'failed to execute request', isError: true, error })
        }

        return res.json({ message: 'update module '+ uuid, isError: false, data: module})
    } catch (error) {
        return res.json({ message: 'failed to execute request', isError: true, error })
    }
})

router.delete('/:uuid', isAuthClient, async (req, res) => {
    const { uuid } = req.params;

    try {
        const module = await Module.findOne({ where: { uuid } })

        if(module){
            await module.destroy()
        } else {
            return res.json({ message: 'failed to execute request', isError: true, error })
        }

        return res.json({ message: 'delete module '+ uuid, isError: false, data: module })
    } catch (error) {
        return res.json({ message: 'failed to execute request', isError: true, error })
    }
})

module.exports = router;