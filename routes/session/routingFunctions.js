const sessionUtilities = require('./utilityFunctions.js')
const bcrypt = require('bcrypt-as-promised')

////////// Routing Functions //////////
function showLogin(req,res,next){
  res.render('users/login', {title: 'Sign In'})
}

function endSession(req,res,next){
  req.session = null
  res.redirect('/blogs')
}


function authenticateNewUser(req,res,next){
  const {email,password} = req.body
  const error = {status: 400, message: 'Bad email or password'}
  const isValid = sessionUtilities.checkUserInput(email,password)
  if(isValid) {
    sessionUtilities.databaseOperationsNew(req,res,next,email,error,password)
  }
  else {
    next(error)
  }
}

function authenticateExistingUser(req,res,next){
  const {email,password} = req.body
  const error = {status: 400, message: 'Bad email or password'}
  const isValid = sessionUtilities.checkUserInput(email,password)
  if(isValid) {
    sessionUtilities.databaseOperationsExisting(req,res,next,email,error,password)
  }
  else {
    next(error)
  }
}




module.exports = {
  showLogin,
  endSession,
  authenticateNewUser,
  authenticateExistingUser
}
