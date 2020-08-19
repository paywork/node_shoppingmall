
const orderModel = require('../models/order')
const productModel = require('../models/product')

exports.orders_get_all = (req, res) => {
    orderModel
        .find()
        .populate("product", ["name", "price"])
        .then(items => {
            if(items.length === 0){
                return res.json({
                    message: "no order count"
                })
            } else {
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
            }

        })
        .catch(err => {
            message: err.message
        })



    // res.json ({
    //     message: 'order retrieve API'
    // })
}

exports.orders_register_order = (req, res) => {

    const {product, quantity} = req.body
    productModel
        .findById(product)
        .then(product => {
            if (!product) {
                return res.json({
                    message: "no product ID"
                })
            } else {
                const newOrder =  new orderModel({
                    product,
                    quantity
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
}

exports.orders_get_order = (req, res) =>{
    orderModel
        .findById(req.params.orderID)
        .populate("product", ["name", "price"])
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

}

exports.orders_update_order = (req, res) => {
    const updateItems = {};
    for (const item of req.body) {
        updateItems[item.propName] = item.value;
    }
    // res.json ({
    //     message: 'order update API'
    // })
    orderModel
        .findByIdAndUpdate(req.params.orderID, {$set: updateItems})
        .then(_ => {
            res.json({
                message: "update order at" + req.params.orderID,
                request: {
                    type: "GET",
                    url: "http://localhost:3838/order/" + req.params.orderID
                }
            })
        })
        .catch(err => {
            res.json({
                message: err.message
            })
        })
}

exports.orders_delete_all = (req, res) => {
    res.json({
        message: 'order delete API'
    })
}

exports.orders_delete_order = (req, res) =>{
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
}