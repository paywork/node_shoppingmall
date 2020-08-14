
const express = require('express')
const morgan = require('morgan')
const bodyParser = require('body-parser')
const app = express()



const productRoute = require('./routes/product')
const orderRoute = require('./routes/order')

//데이터베이스 연결
require('./config/database')



// 미들웨어 설정(거쳐가는 정류장 같은 것 )
app.use(morgan('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))


// Routing 
app.use('/product', productRoute)
app.use('/order', orderRoute)


const PORT = 3838

app.listen(PORT, console.log('server started'))

