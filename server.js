
const express = require('express')
const app = express()


app.use((request, response) => {
   response.json({
       message: 'okay'
   }) 
}) 











const PORT = 3838

app.listen(PORT, console.log('server started'))
