//1
const express = require('express')
const router = express.Router()
const bcrypt = require('bcryptjs')
const userModel = require('../models/user')


// 회원가입
router.post('/signup', (req, res) =>{

    // password 암호화 -> DB에 저장
    bcrypt.hash(req.body.password, 10, (err, hash) => {
        if(err) {
            return res.json({
                error: err.message
            })
        } else {
            // DB에 저장 
            const newUser = new userModel({
                name: req.body.username,
                email: req.body.email,
                phone: req.body.phone,
                password: hash
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
        }
    })








})



// 로그인
router.post('/login', (req, res) => {

})






//2
module.exports = router
