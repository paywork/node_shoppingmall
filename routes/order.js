const express = require('express')
const router = express.Router()


// Order data를 C R U D 


// Order create API
router.post('/', (req, res) => {
    res.json({
        message: 'order create API'
    })
})


// Order retrieve API
router.get('/', (req, res) => {
    res.json ({
        message: 'order retrieve API'
    })
})


// Order update API
router.patch('/', (req, res) => {
    res.json ({
        message: 'order update API'
    })
})


// Order delete API
router.delete ('/', (req, res) => {
    res.json({
        message: 'order delete API'
    })
})




module.exports = router
