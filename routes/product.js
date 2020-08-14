// 1. 
const express = require('express')
const router = express.Router()

const productModel = require('../models/product')

// 3. 
// Product data 를 Create - Retreive - Update - Delete 


// proudct create API (함수를 이용해서)
router.post('/', (req, res) => {


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

})


// product retrieve API
router.get('/total', (req, res) => {

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


// detail product retrieve API
router.get('/:productid', (req, res) => {

    productModel
        .findById(req.params.productid)
        .then(doc => {
            if (!doc) {
                res.json({
                    message: "no product"
                })
            } else {
                res.json({
                    message: "detail product",
                    productInfo: doc
                })
            }

            // res.json({
            //     message: "detail product",
            //     productInfo: doc
            // })
        })
        .catch(err => {
            res.json({
                message: err.message
            })
        })


})



// product update API
router.patch('/:productID', (req, res) => {


    const updateItems = {};
    for (const items of req.body) {
        updateItems[items.propName] = items.value;
    }


    productModel
        .findByIdAndUpdate(req.params.productID, {$set: updateItems})
        .then(_ => {
            res.json({
                message: "updated product at " + req.params.productID
            })
        })
        .catch(err => {
            res.json({
                message: err.message
            })
        })
    // res.json({
    //     message: 'product upadate API'
    // })
})



// product delete API 
router.delete('/', (req, res) => {
    res.json({
        message: 'product delete API'
    })
})

// detail product delete API
router.delete('/:productID', (req, res) => {
    productModel
        .findByIdAndDelete(req.params.productID)
        .then(() => {
            res.json({
                message: 'deleted product'
            })
        })
        .catch(err => {
            res.json({
                message: err.message
            })
        })
})



// 2. 
// 라우터를 모듈화 시켜서 내보낸다 
module.exports = router