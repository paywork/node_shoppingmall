// 1. 
const express = require('express')
const router = express.Router()
const verifyauth = require('../middleware/verify-auth')
const productModel = require('../models/product')

// 3. 
// Product data 를 Create - Retreive - Update - Delete 


// proudct create API (함수를 이용해서)
router.post('/', verifyauth , (req, res) => {

    const newProduct = new productModel({
        name: req.body.productname,
        price: req.body.productprice
    })

    newProduct
        .save()
        .then(doc => {
            res.json({
                message: 'saved product',
                productInfo: {
                    id: doc._id,
                    name: doc.name,
                    price: doc.price,
                    request: {
                        type: 'GET',
                        url: "http://localhost:3838/product/" + doc._id
                    }
                }
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
            const result = {
                count: docs.length,
                products: docs.map(doc => {
                    return{
                        id: doc._id,
                        name: doc.name,
                        price: doc.price,
                        request: {
                            type: "GET",
                            url: "http://localhost:3838/product/" + doc._id
                        }
                    }
                })
            }

            res.json(result)

            // res.json({
            //     message: 'total product data',
            //     count: docs.length,
            //     products: docs
            // })
        })
        .catch(err => {
            res.json({
                message: err.message
            })
        })
})


// detail product retrieve API
router.get('/:productid', verifyauth , (req, res) => {

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
                    productInfo: {
                        id: doc._id,
                        name: doc.name,
                        price: doc.price,
                        request: {
                            type: 'GET',
                            url: "http://localhost:3838/product/total"
                        }
                    }
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
router.patch('/:productID', verifyauth, (req, res) => {


    const updateItems = {};
    for (const items of req.body) {
        updateItems[items.propName] = items.value;
    }


    productModel
        .findByIdAndUpdate(req.params.productID, {$set: updateItems})
        .then(_ => {
            res.json({
                message: "updated product at " + req.params.productID,
                request: {
                    type: "GET",
                    url: "http://localhost:3838/product/" + req.params.productID
                }
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
router.delete('/', verifyauth ,(req, res) => {
    res.json({
        message: 'product delete API'
    })
})

// detail product delete API
router.delete('/:productID', verifyauth,(req, res) => {
    productModel
        .findByIdAndDelete(req.params.productID)
        .then(() => {
            res.json({
                message: 'deleted product',
                request: {
                    type: "GET",
                    url: "http://localhost:3838/product/total"
                }
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