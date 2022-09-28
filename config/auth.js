const jwt = require('jsonwebtoken');

const privateKey = process.env.PRIVATEKEY
const userName = process.env.USERNAME
const userPassword = process.env.PASSWORD

async function authClient(req, res, next){
    const { client_id, client_secret } = req.body

    if(client_id !== userName || client_secret !== userPassword)
        return res.status(401).json({ message: "unauthorized" })

    try {
        const token = await jwt.sign(
            { user: client_id }, 
            privateKey, 
            { expiresIn: '1 day'}
        )

        res.json({ access_token: token })
    } catch (error) {
        return res.status(500).json({ message: "unable to authenticate", error: error.message })
    }
}

async function isAuthClient(req, res, next){
    const { authorization } = req.headers

    if(!authorization) return res.status(401).json({ message: "unauthorized" })

    const authContent = authorization.split(' ')

    if( authContent[0] !== 'Bearer' ) return res.status(401).json({ message: "unauthorized" })

    try {
        const decodedToken = await jwt.verify(authContent[1], privateKey)
        req.decodedToken = decodedToken
        next()
    } catch (error) {
        return res.status(401).json({ message: error.message })
    }
}

module.exports = { authClient, isAuthClient }