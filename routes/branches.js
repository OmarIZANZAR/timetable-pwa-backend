const express = require('express');
const { Op } = require('sequelize')
const { Branche } = require('../database/models')
const { isAuthClient } = require('../config/auth')

const router = express.Router()

router.get('/', async (req, res) => {
    const { searchfor } = req.query
    let filter = {}

    if ( searchfor ) {
        filter[Op.or] = [
            {
                title: {
                    [Op.substring]: searchfor
                },
            },
            {
                departement: {
                    [Op.substring]: searchfor
                }
            }
        ]
    }

    try {
        const branches = await Branche.findAll({
            where: filter,
            attributes: { exclude: ['id'] }
        })
        return res.json({ message: 'get all branches', isError: false, data: branches })
    } catch (error) {
        return res.json({ message: 'failed to execute request', isError: true, error })
    }
})

router.get('/:uuid', async (req, res) => {
    const { uuid }= req.params;

    try {
        const branche = await Branche.findOne({ 
            where: { uuid }, 
            attributes: { exclude: ['id'] }
        })
        return res.json({ message: 'get branche ' + uuid, isError: false, data: branche })
    } catch (error) {
        return res.json({ message: 'failed to execute request', isError: true, error })
    }
})

router.post('/', isAuthClient, async (req, res) => {
    const { title, description, departement } = req.body;

    try {
        const branche = await Branche.create({ title, description, departement })
        return res.json({ message: 'create branche', isError: false, data: branche })
    } catch (error) {
        return res.json({ message: 'failed to execute request', isError: true, error })
    }
})

router.put('/:uuid', isAuthClient, async (req, res) => {
    const { uuid } = req.params;
    const { title, description, departement } = req.body;

    try {
        const branche = await Branche.findOne({ where: { uuid } })

        if(branche){
            await branche.update({ title, description, departement })
        } else {
            return res.json({ message: 'failed to execute request', isError: true, error })
        }

        return res.json({ message: 'update branche '+ uuid, isError: false, data: branche})
    } catch (error) {
        return res.json({ message: 'failed to execute request', isError: true, error })
    }
})

router.delete('/:uuid', isAuthClient, async (req, res) => {
    const { uuid } = req.params;

    try {
        const branche = await Branche.findOne({ where: { uuid } })

        if(branche){
            await branche.destroy()
        } else {
            return res.json({ message: 'failed to execute request', isError: true, error })
        }

        return res.json({ message: 'delete branche '+ uuid, isError: false, data: branche })
    } catch (error) {
        return res.json({ message: 'failed to execute request', isError: true, error })
    }
})

module.exports = router;