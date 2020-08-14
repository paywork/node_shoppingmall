const mongoose = require('mongoose')


// 데이터베이스 연결
const dbaddress = "mongodb+srv://admin:admin1234@cluster0.7l85d.mongodb.net/nodeshoppingmall?retryWrites=true&w=majority"
// const dbaddress = "mongodb://joke716:k9915402@ds141294.mlab.com:41294/node-rest-shop"
const dboptions = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
}


mongoose
    .connect(dbaddress, dboptions)
    .then(_ => console.log('mongodb connected'))
    .catch(error => console.log(error.message))
