const express = require('express');
const { Session, Classroom, Element, Branche, Teacher, Module } = require('../database/models');
const { isAuthClient } = require('../config/auth')

const router = express.Router()

router.get('/', async (req, res) => {
    const { classroom } = req.query
    let params = {
        attributes: { exclude: [ 'id', 'elementId', 'classroomId' ] }
    }
    
    if(classroom) {
        params = {
            where: { classroomId: classroom },
            attributes: { exclude: [ 'id', 'classroomId', 'elementId', 'createdAt', 'updatedAt' ] },
            include: [
                {
                    model: Classroom,
                    attributes: [ 'uuid', 'title', 'grade' ],
                    include: {
                        model: Branche,
                        attributes: [ 'uuid', 'title' ],
                    } 
                },
                {
                    model: Element,
                    attributes: [ 'uuid', 'title' ],
                    include: [ 
                        {
                            model: Teacher,
                            attributes: [ 'uuid', 'firstname', 'lastname' ],
                        } 
                    ]
                }
            ]
        }
    }

    try {
        const sessions = await Session.findAll(params)

        return res.json({ message: 'get all sessions', isError: false, data: sessions })
    } catch (error) {
        return res.json({ message: 'failed to execute request', isError: true, error })
    }
})

router.get('/:uuid', async (req, res) => {
    const { uuid }= req.params;

    try {
        const session = await Session.findOne({ 
            where: { uuid },
            attributes: { exclude: [ 'id', 'classroomId', 'elementId' ] },
            include: [
                {
                    model: Classroom,
                    attributes: { exclude: [ 'id', 'brancheId' ] },
                    include: {
                        model: Branche,
                        attributes: { exclude: ['id'] },
                    }
                },
                {
                    model: Element,
                    attributes: {
                        exclude: [ 'id', 'moduleId', 'teacherId' ]
                    },
                    include: [ 
                        {
                            model: Module,
                            attributes: { exclude: [ 'id', 'brancheId' ] },
                            include: {
                                model: Branche,
                                attributes: { exclude: ['id'] }
                            }
                        }, 
                        {
                            model: Teacher,
                            attributes: { exclude: ['id'] }
                        } 
                    ]
                }
            ] 
        })
        return res.json({ message: 'get session ' + uuid, isError: false, data: session })
    } catch (error) {
        return res.json({ message: 'failed to execute request', isError: true, error })
    }
})

router.post('/', isAuthClient, async (req, res) => {
    const { startWeek, endWeek, day, startTime, endTime, isTp, elementId, classroomId } = req.body;

    try {
        const session = await Session.create({ startWeek, endWeek, day, startTime, endTime, isTp, elementId, classroomId })
        return res.json({ message: 'create session', isError: false, data: session })
    } catch (error) {
        return res.json({ message: 'failed to execute request', isError: true, error })
    }
})

router.put('/:uuid', isAuthClient, async (req, res) => {
    const { uuid } = req.params;
    const { startWeek, endWeek, day, startTime, endTime, isTp, elementId, classroomId } = req.body;

    try {
        const session = await Session.findOne({ where: { uuid } })

        if(session){
            await session.update({ startWeek, endWeek, day, startTime, endTime, isTp, elementId, classroomId })
        } else {
            return res.json({ message: 'failed to execute request', isError: true, error })
        }

        return res.json({ message: 'update session '+ uuid, isError: false, data: session})
    } catch (error) {
        return res.json({ message: 'failed to execute request', isError: true, error })
    }
})

router.delete('/:uuid', isAuthClient, async (req, res) => {
    const { uuid } = req.params;

    try {
        const session = await Session.findOne({ where: { uuid } })

        if(session){
            await session.destroy()
        } else {
            return res.json({ message: 'failed to execute request', isError: true, error })
        }

        return res.json({ message: 'delete session '+ uuid, isError: false, data: session })
    } catch (error) {
        return res.json({ message: 'failed to execute request', isError: true, error })
    }
})

module.exports = router;