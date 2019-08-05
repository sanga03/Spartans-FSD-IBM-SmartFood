const server = require('express').Router()
const userClass = require('../userServices/userService').userClass
const userObj = new userClass()
server.get('/',(req,res)=>{
      userObj.getAllUsers((error,response)=>{
          if(error) {
              res.status(200).json({
                  message: "Something went wrong "
              })
          }
          else
          {
              if(response.length > 0) 
              {
                  res.status(200).json({
                      Users: response
                  })
              }
              else
              {
                  res.status(200).json({
                      message: "Database is empty"
                  })
              }
          }
      })
})

server.post('/saveUser',(req,res)=>{
    userObj.saveUser(req.body,(errorSave,responseSave)=>{
        if(errorSave)
        {
            res.status(200).json({
                message: "Couldn't save the use "
            })
        }
        else 
        {
            res.status(200).json({
                message: " User saved "
            })
        }
    })
})

server.post('/login',(req,res)=>{
    userObj.logIn(req.body,(errorLogin,responseLogin)=>{
        if(errorLogin)
        {
            res.status(200).json({
                message: "Error in fetching user "
            })
        }
        else 
        {   if(responseLogin.length>0)
            {
                res.status(200).json({
                    User: responseLogin
                })
            }
            else 
            {
                res.status(200).json({
                    message: "User does not exist "
                })

            }
        }
    })
})

module.exports.userAPI = server 
