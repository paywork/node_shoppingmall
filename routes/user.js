//1
const express = require('express')
const router = express.Router()
const userModel = require('../models/user')


// 회원가입
router.post('/signup', (req, res) =>{

    const newUser = new userModel({
        name: req.body.username,
        email: req.body.email,
        phone: req.body.phone,
        password: req.body.password
    })

    newUser
        .save()
        .then(user => {
            res.json({
                message: "registered user",
                userInfo: user
            })
        })
        .catch(err => {
            res.json({
                message: err.message
            })
        })




})



// 로그인
router.post('/login', (req, res) => {

})






//2
module.exports = router
