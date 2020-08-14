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
                return res.json({
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
router.get('/total', (req, res) => {
    orderModel
        .find()
        .then(items => {
            const result = {
                count: items.length,
                orders: items.map(item => {
                    return{
                        id: item._id,
                        quantity: item.quantity,
                        product: item.product,
                        request: {
                            type: "GET",
                            url: "http://localhost:3838/order/" + item._id
                        }

                    }
                })
            }
            res.json(result)
        })
        .catch(err => {
            message: err.message
        })



    // res.json ({
    //     message: 'order retrieve API'
    // })
})

// Order detail retrieve APi
router.get('/:orderID', (req, res) =>{
    orderModel
        .findById(req.params.orderID)
        .then(item => {
            if(!item) {
                res.json({
                    message: "no order"
                })
            } else {
                res.json({
                    message: "detail order",
                    orderInfo: {
                        id: item._id,
                        quantity: item.quantity,
                        product: item.product,
                        request: {
                            type: "GET",
                            url: "http://localhost:3838/order/total"
                        }
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

// Order update API
router.patch('/', (req, res) => {
    
    // res.json ({
    //     message: 'order update API'
    // })
})


// Order delete API
router.delete ('/', (req, res) => {
    res.json({
        message: 'order delete API'
    })
})


//detail order delete API
router.delete('/:orderID', (req, res) =>{
    orderModel
        .findByIdAndDelete(req.params.orderID)
        .then(() => {
            res.json({
                message: 'deleted order',
                request: {
                    type: 'GET',
                    url: "http://localhost:3838/order/total"
                }
            })
        })
        .catch(err => {
            res.json({
                message: err.message
            })
        })
})




module.exports = router
