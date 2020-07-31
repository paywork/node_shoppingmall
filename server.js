
const express = require('express')
const app = express()



const productRoute = require('./routes/product')



app.use('/product', productRoute)


const PORT = 3838

app.listen(PORT, console.log('server started'))
