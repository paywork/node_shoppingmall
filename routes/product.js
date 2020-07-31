// 1. 
const express = require('express')
const router = express.Router()

// 3. 
// Product data 를 Create - Retreive - Update - Delete 


// proudct create API (함수를 이용해서)
router.post('/', (req, res) => {


    const newProduct = {
        name: req.body.productname, 
        price: req.body.productprice

    }


    res.json({
        message: 'proudct create API',
        productInfo: newProduct

    })
})


// product retrieve API
router.get('/total', (req, res) => {
    res.json({
        message: 'product retrieve API'
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