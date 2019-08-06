const mongoClient = require('mongodb')
const bcrypt = require('bcrypt')
var salt= '$2b$10$X4kv7j5ZcG39WgogSl16au'

class userService  {

    getAllUsers(callback)
    {
        mongoClient.connect('mongodb://localhost:27017',(err,connectionObj)=>{
            connectionObj.db('SpartansFood').collection('users').find().toArray((error,response)=>{
                callback(error,response)
            })
        })
    }
    logIn(loginCredential,callback)
    {   const hashPassword = bcrypt.hashSync(loginCredential.password,salt)  
        mongoClient.connect('mongodb://localhost:27017',(err,connectionObj)=>{
            connectionObj.db('SpartansFood').collection('users').find({email: loginCredential.email, password: hashPassword}).toArray((error,response)=>{
                callback(error,response)
            })
        })
    }
    saveUser(userCredential,callback)
    {   userCredential.password = bcrypt.hashSync(userCredential.password,salt)
        mongoClient.connect('mongodb://localhost:27017',(err,connectionObj)=>{
            connectionObj.db('SpartansFood').collection('users').insert(userCredential,(error,response)=>{
                callback(error,response)
            })
        })
    }
    serachFood(queryFood,callback)
    {  
        mongoClient.connect('mongodb://localhost:27017',(err,connectionObj)=>{
            connectionObj.db('SpartansFood').collection('users').find({ $text: { $search: "Boiled" } }).toArray((error,response)=>{
                callback(error,response)
            })
        })

    }
    searchRestaurant(queryString,callback)
    {
        
    }


}


// db.users.insert({
//         name: 'Josefin',
//         age: 21,
//         height: 169,
//         weight: 59,
//         gender: 'F',
//         preference: '',
//         type: '',
//         bmi: 0
// })
module.exports.userClass = userService