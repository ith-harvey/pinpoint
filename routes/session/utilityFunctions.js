'use strict'

const bcrypt = require('bcrypt-as-promised')
const db = require('../../db')

function checkUserInput(email,password){
  if(!email || !email.trim()){
    return false
  }
  else if(!password){
    return false
  }
  return true
}

//Promise chain control flow
function databaseOperations(req,res,next,email,password,error){
  return db('users')
    .where('email',email).first()
    .then(checkDbResponse(error))
    .then(compareHashes(password,error))
    .then(deleteHashedPasswordAndRespond(req,res))
    .catch((err) => next(err))
}

//Ensure response is not undefined
function checkDbResponse(error){
  return (user) => {
    if(!user){
      throw error
    }
    return user
  }
}

//Compare hash of entered password with record in database
function compareHashes(password,error){
  return (user) => {
    return bcrypt.compare(password,user.hashed_password)
      .then(() => user)
      .catch(bcrypt.MISMATCH_ERROR, () => {
        throw error
      })
  }
}

//attach sessionid to user, and delete hashed_password from client response
function deleteHashedPasswordAndRespond(req,res){
  return (user) => {
    delete user.hashed_password
    req.session.userId = user.id
    return res.redirect(`/users/${user.id}/customize`)
  }
}

module.exports = {
  checkUserInput,
  databaseOperations,
  checkDbResponse,
  compareHashes,
  deleteHashedPasswordAndRespond
}
