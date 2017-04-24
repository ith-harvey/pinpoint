const express = require('express')
const router = express.Router()
const bcrypt = require('bcrypt-as-promised')
const db = require('../../db')
const userUtilities = require('./utilityFunctions.js')


////////// Routes //////////
router.get('/register', showRegistrationPage)
router.post('/register', registerUser)

router.get('/:id/feed', authorize, seeUserFeed)

// form to add tags to a user id
router.post('/:id/edit', editUserPreferences)




////////// Routing Functions  //////////
function authorize(req,res,next){
  const id = req.params.id
  const error = {status: 401, message: 'Unauthorized'}
  return parseInt(req.session.userId) === parseInt(id) ? next() : next(error)
}

function showRegistrationPage(req,res,next){
  return db('tags')
    .then((tags) => {
      res.render('users/registration',{tags})
    })
    .catch((err) => next(err))
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


function seeUserFeed(req,res,next) {
  const id = req.params.id
  return retreiveUserTags(id)
    .then((userData) => {
      const userTags = getTagNames(userData)
      res.render('users/userFeed', {
        userId: id,
        userName: userData[0].user_name,
        userTags: userTags
      })
    })
    .catch((err) => next(err))
}



//handle post request for add preferences form
function editUserPreferences(req,res,next) {
  const id = req.params.id
}

//retreive all users and tag info that match the user id passed in through req.params
function retreiveUserTags(id){
  return db.select('users.user_name','tags.name')
    .from('users')
    .innerJoin('users_tags','users.id','users_tags.user_id')
    .innerJoin('tags','users_tags.tag_id','tags.id')
    .where('users.id',id)
}

function getTagNames(userData){
  const arrayOfTags = []
  userData.forEach(innerObj => {
    arrayOfTags.push({name: innerObj['name']})
  })
  return arrayOfTags
}


module.exports = router
