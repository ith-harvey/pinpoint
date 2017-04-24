'use strict'

const express = require('express')
const bcrypt = require('bcrypt-as-promised')
const router = express.Router()

const sessionUtilities = require('./utilityFunctions.js')

//http://expressjs-book.com/index.html%3Fp=128.html

////////// Main Routes //////////
router.get('/', showLogin)
router.post('/', authenticateUser)
router.delete('/', endSession)


////////// Routing Functions //////////
function showLogin(req,res,next){
  res.render('users/login', {title: 'Sign In'})
}

function endSession(req,res,next){
  const message = {message: 'You have been logged out'}
  req.session = null
  res.status(200).json(mesage)
}

function authenticateUser(req,res,next){
  const {email,password} = req.body
  const error = {status: 400, message: 'Bad email or password'}
  const isValid = sessionUtilities.checkUserInput(email,password)
  if(isValid) {
    sessionUtilities.databaseOperations(req,res,next,email,password)
  }
  else {
    next(error)
  }
}

module.exports = router
