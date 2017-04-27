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
  //auth for new user
function databaseOperationsNew(req,res,next,email,error,password){
  return db('users')
    .where('email',email).first()
    .then(checkDbResponse(error))
    .then(compareHashes(password,error))
    .then(deleteHashedPasswordAndRespondNew(req,res))
    .catch((err) => next(err))
}

  //auth for existing user
function databaseOperationsExisting(req,res,next,email,error,password){
  return db('users')
    .where('email',email).first()
    .then(checkDbResponse(error))
    .then(compareHashes(password,error))
    .then(deleteHashedPasswordAndRespondExisting(req,res))
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
function deleteHashedPasswordAndRespondNew(req,res){
  return (user) => {
    delete user.hashed_password
    req.session.userId = user.id
    return res.redirect(`/users/${user.id}/customize`)
  }
}


function deleteHashedPasswordAndRespondExisting(req,res){
  return (user) => {
    delete user.hashed_password
    req.session.userId = user.id
    return res.redirect(`/users/${user.id}/feed`)
  }
}



module.exports = {
  checkUserInput,
  databaseOperationsNew,
  databaseOperationsExisting,
  checkDbResponse,
  compareHashes,
  deleteHashedPasswordAndRespondNew,
  deleteHashedPasswordAndRespondExisting
}
