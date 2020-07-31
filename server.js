
const express = require('express')
const app = express()



const productRoute = require('./routes/product')
const orderRoute = require('./routes/order')


app.use('/product', productRoute)
app.use('/order', orderRoute)

const PORT = 3838

app.listen(PORT, console.log('server started'))

