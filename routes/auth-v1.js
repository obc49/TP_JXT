const logger = require("../model/idp")
const express = require('express')
const router = express.Router()
usersModel = undefined
loggerModel = undefined

router.get("/verifyaccess", (req, res, next) => {
    let token = req.header("Authorization")
    if (token) {
      token = token.replace("bearer ", "")
      const access = loggerModel.verifyacess(token).then((trouver) => {
        res.status(200).json({ message: "Ok" })
  
      }).catch(()=> {usersModel = undefined
        loggerModel = undefined
        
        res.status(401).json({ message: "Unauthorized" })
      })
    }else {
      res.status(401).json({ message: "Unauthorized" })
    }
  })

  router.post("/login", (req, res, next) => {
    const login = req.body.login
    const password = req.body.password
    if (login && password) {
      loggerModel.login(login, password).then(token => {
        res.status(200).json({ message: "successful", access_token: token })
      })
      .catch(() => {
        res.status(401).json({ message: "Unauthorized" })
      })
    }else {
      res.status(401).json({ message: "Unauthorized" })
    }
  })

  module.exports = (user, logger) => {
    usersModel = user
    loggerModel = logger
    return router
  }