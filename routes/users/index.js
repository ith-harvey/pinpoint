const express = require('express')
const router = express.Router()
const bcrypt = require('bcrypt-as-promised')
const db = require('../../db')
const userUtilities = require('./utilityFunctions.js')


////////// Routes //////////
router.get('/register', showRegistrationPage)
router.post('/register', registerUser)

router.get('/:id/tags', seeUserPreferences)
router.post('/:id/tags', addUserPreferences)




////////// Routing Functions  //////////
function showRegistrationPage(req,res,next){
  res.render('users/registration',{title: 'Register'})
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
              userUtilities.checkResponse(user)
              res.redirect('/blogs')
            })
        })
    })
    .catch((err) => next(err))
}


function seeUserPreferences(req,res,next) {
  const id = req.params.ids

  const userTags = retreiveUserTags()
  res.render('users/preferences', {userTags})
}

function addUserPreferences(req,res,next) {
  const id = req.params.id
}

function retreiveData(){
  return db.select('users.user_name')
}

//retreive all tags that match the user id passed in through req.params
function retreiveUserTags(){
  const id = 1

  return db.select('*')
    .from('tags')
    .innerJoin('users_tags','tags.id','users_tags.id')
    .where('users_tags.id',id)
}





module.exports = router
