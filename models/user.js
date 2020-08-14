//1번
const mongoose = require('mongoose')


//2번
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    phone: {
        type: Number,
        required: true
    },
    password: {
        type: String,
        required: true
    }
})

//이름, 이메일주소, 연락처, 패스워드



//3번
module.exports = mongoose.model("user", userSchema)