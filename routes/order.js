const express = require('express')
const router = express.Router()

const orderModel = require('../models/order')
const productModel = require('../models/product')
// Order data를 C R U D 


// Order create API
router.post('/', (req, res) => {

    productModel
        .findById(req.body.productId)
        .then(product => {
            if (!product) {
                res.json({
                    message: "no product ID"
                })
            } else {
                const newOrder =  new orderModel({
                    product: req.body.productId,
                    quantity: req.body.qty
                })

                newOrder
                    .save()
                    .then(item => {
                        res.json({
                            message: "saved order",
                            orderInfo: {
                                id: item._id,
                                product: item.product,
                                quantity: item.quantity,
                                request: {
                                    type: "GET",
                                    url: "http://localhost:3838/order/" + item._id
                                }
                            }
                        })
                    })
                    .catch(err => {
                        res.json({
                            message: err.message
                        })
                    })
            }
        })
        .catch(err => {
            res.json({
                message: err.message
            })
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
