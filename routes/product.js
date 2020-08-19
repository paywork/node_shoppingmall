// 1. 
const express = require('express')
const router = express.Router()
const verifyauth = require('../middleware/verify-auth')


// 3. 
// Product data 를 Create - Retreive - Update - Delete 

//controller
const {
    products_get_all,
    products_register_product,
    products_get_product,
    products_update_product,
    products_delete_product
} = require('../controller/product')

// proudct create API (함수를 이용해서)
router.post('/', verifyauth , products_register_product)


// product retrieve API
router.get('/total', products_get_all)


// detail product retrieve API
router.get('/:productid', verifyauth , products_get_product)



// product update API
router.patch('/:productID', verifyauth, products_update_product)



// product delete API 
router.delete('/', verifyauth ,(req, res) => {
    res.json({
        message: 'product delete API'
    })
})

// detail product delete API
router.delete('/:productID', verifyauth, products_delete_product)



// 2. 
// 라우터를 모듈화 시켜서 내보낸다 
module.exports = router