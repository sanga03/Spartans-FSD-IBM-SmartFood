const mongoClient = require('mongodb')
const bcrypt = require('bcrypt')
var salt= '$2b$10$X4kv7j5ZcG39WgogSl16au'

class restaurantClass {
    getAllUsers(callback)
    {
        mongoClient.connect('mongodb://localhost:27017',(err,connectionObj)=>{
            connectionObj.db('SpartansFood').collection('users').find().toArray((error,response)=>{
                callback(error,response)
            })
        })
    }
}