const express = require('express')
const router = express.Router()
const bcrypt = require('bcrypt-as-promised')
const db = require('../../db')
const userUtilities = require('./utilityFunctions.js')

//http://bootsnipp.com/snippets/featured/multi-select-tiled-layout
  //fancy select tiles

////////// Routes //////////
router.get('/register', showRegistrationPage)
router.post('/register', registerUser)

router.get('/:id/feed', authorize, seeUserFeed)

// form to add tags to a user id
router.get('/:id/customize', customizePreferencesForm)
router.post('/:id/customize',customizePreferences)

router.get('/:id/edit', seeUserEditForm)
router.put('/:id/edit', editUserPreferences)




////////// Routing Functions  //////////
function authorize(req,res,next){
  const id = req.params.id
  const error = {status: 401, message: 'Unauthorized'}
  return parseInt(req.session.userId) === parseInt(id) ? next() : next(error)
}

function showRegistrationPage(req,res,next){
  res.render('users/registration',{title: 'Register'})
}


//hash methodology needs a workfactor to be specified
  //may be easier to use request promise to wrangle the inputted data into an array called by req.body
function registerUser(req,res,next){
  console.log(req.body)
  const {user_name,email,password,name} = req.body
  return bcrypt.genSalt(10)
    .then((salt) => {
      return bcrypt.hash(password,salt)
    })
    .then((password) => {
      return db('users')
        .insert({user_name, email, hashed_password: password},'*')
    })
    .then((user) => {
      console.log(user)
      userUtilities.checkResponse(user)
      res.redirect(`/users/${user.id}/customize`)
    })
    .catch((err) => next(err))
}

function customizePreferencesForm(req,res,next){
  const id = req.params.id
  return db('tags')
    .then((tags) => {
      res.render('users/customizePreferences',{tags: tags, id: id})
    })
    .catch((err) => next(err))
}

function customizePreferences(req,res,next){
  const id = req.params.id
  const {name} = req.body
  console.log({name},req.body)
  return names.map(tag => {
    return db('tags')
      .insert(tag)
      .then(() => {
        res.redirect(`/users/${id}/feed`)
      })
      .catch((err) => next(err))
  })
}


function seeUserFeed(req,res,next) {
  const id = req.params.id
  return userUtilities.retreiveUserTags(id)
    .then((userData) => {
      const userTags = userUtilities.getTagNames(userData)
      res.render('users/userFeed', {
        userId: id,
        userName: userData[0].user_name,
        userTags: userTags
      })
    })
    .catch((err) => next(err))
}


//handle put request for edit user information form
function seeUserEditForm(req,res,next){

}

function editUserPreferences(req,res,next) {
  const id = req.params.id
}




module.exports = router
