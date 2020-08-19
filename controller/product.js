

const productModel = require('../models/product')

exports.products_get_all = (req, res) => {

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
}

exports.products_register_product = (req, res) => {

    // const {name, price} = req.body
    const {name, price} = req.body
    const newProduct = new productModel({
        name, price
        // name: req.body.productname,
        // price: req.body.productprice
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

}

exports.products_get_product = (req, res) => {

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


}

exports.products_update_product = (req, res) => {


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
}

exports.products_delete_product = (req, res) => {
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
}