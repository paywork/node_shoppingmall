const express = require('express')
const router = express.Router()


// Order data를 C R U D 


// Order create API
router.post('/', (req, res) => {

    const newOrder = {
        productid: req.body.productid,
        quantity: req.body.quantity
    }

    res.json({
        message: 'order create API',
        orderinfo: newOrder
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
