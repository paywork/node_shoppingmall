//1
const express = require('express')
const router = express.Router()
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const userModel = require('../models/user')


// 회원가입
router.post('/signup', (req, res) =>{

    // 이메일 유무 체크 -> password 암호화 -> DB에 저장

    userModel
        .findOne({email: req.body.email})
        .then(user => {
            if(user) {
                //email이 있으면
                return res.json({
                    message: "email exists"
                })
            } else {
                //email이 없으면
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
            }
        })
        .catch(err => {
            res.json({
                message: err.message
            })
        })














})



// 로그인
router.post('/login', (req, res) => {
   userModel
       .findOne({email: req.body.email})
       .then(user => {
           if(!user){
               return res.json({
                   message: "no email"
               })
           } else {
               bcrypt.compare(req.body.password, user.password, (err, result) =>{
                   if(err || result === false){
                       return res.json({
                           message: "password incorrect"
                       })
                   } else {
                       // res.json(user)

                       //토큰 생성, 상수화
                       const token = jwt.sign(
                           {email: user.email, id: user._id},
                           "key",
                           {expiresIn: "1d"}
                       )

                       res.json({
                           message: "successful login",
                           tokenInfo: token
                       })

                   }
               })
           }
       })
       .catch(err => {
           res.json({
               err: err.message
           })
       })
})






//2
module.exports = router
