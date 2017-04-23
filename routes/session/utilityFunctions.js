'use strict'

const bcrypt = require('bcrypt-as-promised')

function checkUserInput(email,password){
  if(!email || !email.trim()){
    return false
  }
  else if(!password){
    return false
  }
  return true
}

function checkDbResponse(error){
  return (user) => {
    if(!user){
      throw error
    }
    return user
  }
}

function compareHashes(password,error){
  return (user) => {
    return bcrypt.compare(password,user.hashed_password)
      .then(() => user)
      .catch(bcrypt.MISMATCH_ERROR, () => {
        throw error
      })
  }
}

function deleteHashedPasswordAndRespond(req,res){
  return (user) => {
    console.log(user)
    delete user.hashed_password
    req.session.userId = user.id
    console.log(req.session)
    return res.send(user)
  }
}

module.exports = {
  checkUserInput,
  checkDbResponse,
  compareHashes,
  deleteHashedPasswordAndRespond
}
