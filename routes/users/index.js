const express = require('express')
const router = express.Router()
const bcrypt = require('bcrypt-as-promised')
const db = require('../../db')
const userUtilities = require('./utilityFunctions.js')

const sessionRouting = require('../session/routingFunctions.js')

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
  //redirect to showAllBlogs if req.session.id not present
function authorize(req,res,next){
  const id = req.params.id
  const error = {status: 401, message: 'Unauthorized'}
  if(parseInt(req.session.userId) === parseInt(id)){
    return next()
  }
  else{
    // next(error)
    res.redirect('/blogs')
  }
}

function showRegistrationPage(req,res,next){
  res.render('users/registration',{title: 'Register'})
}


//hash methodology needs a workfactor to be specified
  //may be easier to use request promise to wrangle the inputted data into an array called by req.body
function registerUser(req,res,next){
  const {user_name,email,password} = req.body
  const errorMessage = 'Bad Email or Password'
  if(userUtilities.checkResponse(req.body)){
    return bcrypt.genSalt(10)
      .then((salt) => {
        return bcrypt.hash(password,salt)
      })
      .then((password) => {
        return db('users')
          .insert({user_name, email, hashed_password: password},'*')
      })
      .then(() => {
        return sessionRouting.authenticateUser('register')
      })
      .catch((err) => next(err))
  }
  else{
    res.render('users/registration',{errorMessage})
  }
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
  const userId = req.params.id
  const {id} = req.body
  return db('users_tags')
    .insert({
      user_id: userId,
      tag_id: parseInt(id)
    })
    .then(() => {
      res.redirect(`/users/${userId}/feed`)
    })
    .catch((err) => next(err))
}


// result[0][0].tags = utilFunc.removeDuplicates(result[2],'name')
function seeUserFeed(req,res,next){
  const id = req.params.id
  return Promise.all([getBlogs(),getUserTags(id),getBlogTags()])
    .then((result) => {
      result[0][0].tags = userUtilities.removeDuplicates(result[2],'name')
      console.log(result[0])
      res.render('users/userFeed',{
        userId: id,
        userName: result[1][0].user_name,
        blogs: userUtilities.sortBlogsByRating(result[0]),
        userTags: userUtilities.removeDuplicates(result[1],'name')
      })
    })
    .catch((err) => next(err))
}

function getBlogs(){
  return db('blogs')
}

function getBlogTags(){
  return db.select('tags.id AS tag_id','tags.name','blogs.title', 'blogs.description','blogs.rating','blogs.url')
    .from('tags')
    .fullOuterJoin('blogs_tags','tags.id','blogs_tags.tag_id')
    .fullOuterJoin('blogs','blogs_tags.blog_id','blogs.id')
}

function getUserTags(id){
  return db.select('tags.id AS tag_id','tags.name', 'users.user_name')
    .from('tags')
    .fullOuterJoin('users_tags','tags.id','users_tags.tag_id')
    .fullOuterJoin('users','users_tags.user_id','users.id')
    .where('users.id',id)
}



//handle put request for edit user information form
function seeUserEditForm(req,res,next){

}

function editUserPreferences(req,res,next) {
  const id = req.params.id
}




module.exports = router
