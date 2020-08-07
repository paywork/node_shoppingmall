// 1. 
const express = require('express')
const router = express.Router()

const productModel = require('../models/product')

// 3. 
// Product data 를 Create - Retreive - Update - Delete 


// proudct create API (함수를 이용해서)
router.post('/', (req, res) => {


    // const newProduct = {
    //     name: req.body.productname,
    //     price: req.body.productprice
    //
    // }
    const newProduct = new productModel({
        name: req.body.productname,
        price: req.body.productprice
    })

    newProduct
        .save()
        .then(doc => {
            res.json({
                message: 'saved product',
                productInfo: doc
            })
        })
        .catch(err => {
            res.json({
                message: err.message
            })
        })



    // res.json({
    //     message: 'proudct create API',
    //     productInfo: newProduct
    //
    // })
})


// product retrieve API
router.get('/total', (req, res) => {
    // res.json({
    //     message: 'product retrieve API'
    // })
    productModel
        .find()
        .then(docs => {
            res.json({
                message: 'total product data',
                count: docs.length,
                products: docs
            })
        })
        .catch(err => {
            res.json({
                message: err.message
            })
        })
})


// product upadate API
router.patch('/', (req, res) => {
    res.json({
        message: 'product upadate API'
    })
})



// product delete API 
router.delete('/', (req, res) => {
    res.json({
        message: 'product delete API'
    })
})



// 2. 
// 라우터를 모듈화 시켜서 내보낸다 
module.exports = router