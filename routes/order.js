const express = require('express')
const router = express.Router()
const verifyauth = require('../middleware/verify-auth')

// Order data를 C R U D 

const {
    orders_get_all,
    orders_register_order,
    orders_get_order,
    orders_update_order,
    orders_delete_all,
    orders_delete_order
} = require('../controller/order')

// Order create API
router.post('/', verifyauth,  orders_register_order)

// Order retrieve API
router.get('/total', verifyauth ,orders_get_all)

// Order detail retrieve APi
router.get('/:orderID', verifyauth , orders_get_order)

// Order update API
router.patch('/:orderID', verifyauth , orders_update_order)

// Order delete API
router.delete ('/', verifyauth, orders_delete_all)

//detail order delete API
router.delete('/:orderID', verifyauth, orders_delete_order)




module.exports = router
