const express = require("express")
const server = express()
const parser = require('body-parser')
const cors = require('cors')
const userRoute = require('./userAPI/userAPI').userAPI

server.use(parser.json())
server.use(cors())


server.get('/',(req,res)=>{
    res.status(200).json({
        message: "Server is running "
    })
})
server.use('/user',userRoute)

server.listen(2020,()=>{
    console.log("server is running at 2020")
})
