var express = require('express');
var router = express.Router();
var sequelize = require('../db');
var User = sequelize.import('../models/user');
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');


router.post('/signup', (req, res) => {
    User.create({
        username: req.body.username,
        password: bcrypt.hashSync(req.body.password, 10)
    })
    .then(
        createSuccess = (user) => {
            let token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
                expiresIn: 60 * 60 * 24
            })
            res.json({
                user: user,
                message: "User Created!",
                sessionToken: token
            })
        },
        createError = err => res.send(500, err)
    )
})


router.post('/signin', (req, res) => {
    User.findOne({
        where: {
            username: req.body.username,
        }
    })
    .then(user => {
        if(user){
            bcrypt.compare(req.body.password, user.password, (err, matches) => {
                if(matches){
                    let token = jwt.sign({ id: user.id}, process.env.JWT_SECRET, {
                        expiresIn: 60 * 60 * 24
                    })
                    res.json({
                        user: user,
                        message: 'Successfully authenticated user',
                        sessionToken: token
                    })
                } else {
                    res.status(502).send({error: 'bad gateway'})
                }
            })
        } else {
            res.status(500).send({error: 'Failed to authenticate'})
        }
    }, err => res.status(501).send({error: 'Failed to proces'}))
})

module.exports = router;