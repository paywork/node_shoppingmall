
const express = require('express')
const morgan = require('morgan')
const app = express()



const productRoute = require('./routes/product')
const orderRoute = require('./routes/order')



// 미들웨어 설정(거쳐가는 정류장 같은 것 )
app.use(morgan('dev'))


app.use('/product', productRoute)
app.use('/order', orderRoute)

const PORT = 3838

app.listen(PORT, console.log('server started'))

