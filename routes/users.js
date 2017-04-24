const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt-as-promised')


/* GET users listing. */
router.get('/', showRegistrationPage);
router.post('/', registerUser);

function showRegistrationPage(req,res,next){
  res.render('registration',{title: 'Register'})
}


function registerUser(req,res,next){
  const {user_name,email,password} = req.body

  return bcyrpt.hash(password,10) //work factor of 10 to make sure timeout doesnt fail it -- 12 standard
    .then((password) => {
      return knex('users')
        .insert({user_name, email, hashed_password: password},'*').first()
        .then((user) => {
          checkResponse(user)
          
        })
    })
    .catch((err) => next(err))
}


function checkResponse(addedUser){
  const emailError = {status: 400, message: 'Email must not be blank'}
  const passwordError = {status: 400, message: 'Password must be longer than 8 characters'}

  if(!userData.email){
    return emailError
  }
  else if(checkPassword(userData.password)) {
    return passwordError
  }
  return userData
}

function checkPassword(passwordStr){
  return passwordStr.split('').length >= 8 ? true : false
}

module.exports = router;
