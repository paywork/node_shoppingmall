//1번
const mongoose = require('mongoose')


//2번
const userSchema = new mongoose.Schema()


//3번
module.exports = mongoose.model("user", userSchema)