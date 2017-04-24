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
              userUtilities.checkResponse(user)
              res.redirect('/blogs')
            })
        })
    })
    .catch((err) => next(err))
}


function seeUserPreferences(req,res,next) {
  const id = req.params.id

  return retreiveUserTags(id)
    .then((userData) => {
      console.log(userData)
      const dataToSend = reduceData(userData)
      res.render('users/preferences', {dataToSend})
    })
    .catch((err) => next(err))
}

function addUserPreferences(req,res,next) {
  const id = req.params.id
}

//retreive all users and tag info that match the user id passed in through req.params
function retreiveUserTags(id){
  return db.select('users.user_name','tags.name')
    .from('tags')
    .innerJoin('users_tags','tags.id','users_tags.id')
    .innerJoin('users','users_tags.id','users.id')
    .where('users.id',id)
}

function reduceData(data){
  return data.reduce()
}





module.exports = router
