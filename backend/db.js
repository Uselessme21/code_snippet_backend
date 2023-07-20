const mongoose = require('mongoose')
require('dotenv').config()
const  connection = mongoose.connect(process.env.mongoURI).then(()=>{
    console.log("connected to db")
}).catch((error)=>{
    console.log(error)
})

module.exports = connection
