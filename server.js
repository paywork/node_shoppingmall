
const express = require('express')
const morgan = require('morgan')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const app = express()



const productRoute = require('./routes/product')
const orderRoute = require('./routes/order')

// 데이터베이스 연결
const dbaddress = "mongodb+srv://admin:admin1234@cluster0.7l85d.mongodb.net/nodeshoppingmall?retryWrites=true&w=majority"

mongoose
    .connect(dbaddress, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(_ => console.log('mongodb connected'))
    .catch(error => console.log(error.message))



// 미들웨어 설정(거쳐가는 정류장 같은 것 )
app.use(morgan('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))


// Routing 
app.use('/product', productRoute)
app.use('/order', orderRoute)


const PORT = 3838

app.listen(PORT, console.log('server started'))

