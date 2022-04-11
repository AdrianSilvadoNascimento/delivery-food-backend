const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const User = require('../models/user')

const SECRET = process.env.SECRET_KEY

exports.registerUser = async (req, res) => {
    try {
        let newUser = await User.findOne({ email: req.body.email })
        let newUsername = await User.findOne({ username: req.body.username })
        if (newUser) {
            return res.status(400).json({ message: 'Email already registered' })
        } else if (newUsername) {
            return res.status(400).json({ message: 'Username already registered' })
        } else {
            newUser = new User({
                username: req.body.username,
                email: req.body.email,
                password: req.body.password,
            })
            const salt = await bcrypt.genSalt(10)
            newUser.password = await bcrypt.hash(req.body.password, salt)
            await newUser.save()
            res.send({ message: 'Registered Successfuly!' })
        }
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

exports.loginUser = async (req, res) => {
    try {
        let user = await User.findOne({ email: req.body.email })
        let validPassword = await bcrypt.compare(req.body.password, user.password)
        if (!user) {
            res.status(401).json({ message: 'Invalid email' })
        } else if (!validPassword) {
            res.status(401).json({ message: 'Invalid password' })
        } else {
            const token = jwt.sign({
                username: user.username,
                email: user.email,
                userId: user._id
            },
            SECRET, { expiresIn: '1h' }
            )
            return res.status(200).json({
                token: token,
                userId: user._id,
                expiresIn: 3600,
                username: user.username
            })
        }
    } catch (error) {
        res.status(500).json({ message: 'An internal error has been occurred!' })
    }
}