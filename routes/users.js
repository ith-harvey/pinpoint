const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt-as-promised')
const db = require('../db')


/* GET users listing. */
router.get('/register', showRegistrationPage);
router.post('/register', registerUser);

function showRegistrationPage(req,res,next){
  res.render('registration',{title: 'Register'})
}


//hash methodology needs a workfactor to be specified
  //need to redirect to the users specific blog feed
function registerUser(req,res,next){
  const {user_name,email,password} = req.body

  return bcrypt.genSalt(10)
    .then((salt) => {
      return bcrypt.hash(password,salt)
        .then((password) => {
          return db('users')
            .insert({user_name, email, hashed_password: password},'*')
            .then((user) => {
              console.log('!',user,user[0])
              checkResponse(user)
              res.redirect('/blogs')
            })
        })
    })
    .catch((err) => next(err))

}


function checkResponse(addedUser){
  const emailError = {status: 400, message: 'Email must not be blank'}
  const passwordError = {status: 400, message: 'Password must be longer than 8 characters'}

  if(!addedUser.email){
    return emailError
  }
  else if(checkPassword(addedUser.password)) {
    return passwordError
  }
  return userData
}


//may need to modify this validation methodology
function checkPassword(passwordStr){
  return passwordStr.split('').length <= 8 ? true : false
}


module.exports = router;
