const bcrypt = require("bcrypt")
const salt_round = 10;
const jwt = require("jsonwebtoken")
const fs = require("fs")
const secret = fs.readFileSync("jwtRS256.key")
users = undefined

const Myhash = (login) => {
    const hash = users.getAll().filter((value) => {
      return value.login === login
    });
    if (hash.length > 0) {
        return hash[0].password
    } else {
        return undefined
      }
}

const login = (login, password) => {
    return new Promise((resolve, reject) => {
      const hash = Myhash(login)
        if (!hash) {
            reject()
        } else {
            bcrypt
               .compare(password, hash)
               .then((compare) => {
                  if (compare) {
                    const token = jwt.sign(login, secret, (err, token) =>{
                        if (err) {
                            reject()
                        } else {
                            resolve(token)
                        }
                     })
                  } else {
                      reject()
                    }
                })
                .catch(() => reject())
          }
    })
}

const verifyacess = (token) => {
    return new Promise((resolve, reject) => {
      jwt.verify(token, secret, (err, trouver) => {
        if (err) {
          reject()
        } else {
          resolve(trouver)
        }
      })
    })
  }

  module.exports = model => {
    users = model
    return { login, verifyacess }
  }
                

