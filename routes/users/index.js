const express = require('express')
const router = express.Router()
const bcrypt = require('bcrypt-as-promised')
const db = require('../../db')
const userUtilities = require('./utilityFunctions.js')


/* GET users listing. */
router.get('/register', showRegistrationPage)
router.post('/register', registerUser)

router.get('/:id/tags', seeUserPreferences)
router.post('/:id/tags', addUserPreferences)


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





module.exports = router
