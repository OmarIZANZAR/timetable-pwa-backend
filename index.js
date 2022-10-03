const dotenv = require('dotenv').config();

if( process.env.NODE_ENV === 'development' ){
    require('colors');
} 

const cors = require('cors');
const express = require('express');
const { sequelize } = require('./database/models');
const { authClient } = require('./config/auth');
const {
    StudentsRouter, 
    TeachersRouter, 
    ClassroomsRouter, 
    BranchesRouter,
    ModulesRouter,
    ElementsRouter, 
    SessionsRouter 
} = require('./routes');

// Connecting to DB:
async function connectDB() {
    return new Promise( async (resolve, reject) => {
        try {
            await sequelize.authenticate()

            if( process.env.NODE_ENV === 'development' ){
                console.log(`db connected to ${sequelize.config.database}...`.yellow.bold)
            } else {
                console.log(`db connected to ${sequelize.config.database}...`)
            }
            
            resolve()
        } catch (error) {
            if( process.env.NODE_ENV === 'development' ){
                console.log("db not connected".red.bold.underline)
            } else {
                console.log("db not connected")
            }
        }
    })
}
connectDB()

// App Initiate:
const app = express()
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Routes:
app.use('/students', StudentsRouter)
app.use('/teachers', TeachersRouter)
app.use('/classrooms', ClassroomsRouter)
app.use('/branches', BranchesRouter)
app.use('/modules', ModulesRouter)
app.use('/elements', ElementsRouter)
app.use('/sessions', SessionsRouter)

// Base:
app.get('/', (req, res) => {
    if( process.env.NODE_ENV === 'development' ){
        res.redirect('http://localhost:3000')
    } else {
        res.redirect('https://ensemtimetable.netlify.app')
    }
})

// Authenticate a Client:
app.post('/authenticate', authClient)

// Server:
const PORT = 5000 || process.env.PORT
app.listen(PORT, () => {
    if( process.env.NODE_ENV === 'development' ){
        console.log(`server running on port ${PORT}...`.yellow.bold)
    } else {
        console.log(`server running on port ${PORT}...`)
    }
})