const express = require('express')
const router = express.Router()
const bcrypt = require('bcrypt-as-promised')
const db = require('../../db')
const userUtilities = require('./utilityFunctions.js')

const util = require('util')

const sessionRouting = require('../session/routingFunctions.js')

////////// Routes //////////
router.get('/register', showRegistrationPage)
router.post('/register', registerUser)

router.get('/:id/feed', authorize, seeUserFeed)

// form to add tags to a user id
router.get('/:id/customize', authorize, customizePreferencesForm)
router.post('/:id/customize', authorize, customizePreferences)

// NOT BUILT - So user can edit their information
router.get('/:id/edit', seeUserEditForm)
router.put('/:id/edit', editUserPreferences)




////////// Routing Functions  //////////
  //redirect to showAllBlogs if req.session.id not present
function authorize(req,res,next){
  const id = req.params.id
  const error = {status: 401, message: 'You must be logged in to access this feature'}
  if(parseInt(req.session.userId) === parseInt(id)){
    return next()
  }
  else{
    next(error)
    // res.redirect('/blogs')
  }
}

function showRegistrationPage(req,res,next){
  res.render('users/registration',{title: 'Register'})
}


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
        return sessionRouting.authenticateNewUser(req,res,next)
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
  const ids = userUtilities.turnIntoArray(req.body.id)

  let useTagsInsert = ids.map( id => {
    return {user_id: userId, tag_id: id}
  })
  return db('users_tags')
    .insert(useTagsInsert)
    .then(() => {
      res.redirect(`/users/${userId}/feed`)
    })
    .catch((err) => next(err))
}


function seeUserFeed(req,res,next) {
  const userId = req.params.id
  return Promise.all([getBlogs(),getUserTags(userId)])
    .then((result) => {
      let blogs = userUtilities.modfiyBlogsObject(result[0])
      let userTagsArr = result[1]

    // filters all blogs based off of a userstag preferences
    let userFilteredBlogs = blogs.filter(blog => {
        let blogAndUserShareTag = blog.tags.filter(blogTagObj => {
            if (userTagsArr.findIndex( x => x.tag_id === blogTagObj.id) != -1) {
              return blogTagObj
            } else {
              return
            }
          })[0]

          // if the blog and user do share a tag then return that blog
          if(blogAndUserShareTag) {
            return blog
          } else {
            return
          }
      })

      res.render('users/userFeed',{
        userId: userId,
        userName: result[1][0].user_name,
        blogs: userUtilities.sortBlogsByRating(userFilteredBlogs),
        userId,
        userTags: userUtilities.removeDuplicates(result[1],'name')
      })
    })
    .catch((err) => next(err))
}


function getBlogs() {
  return db.select(
    'blogs.title','blogs.id','tags.id AS tag_id','tags.name','blogs.rating', 'blogs.description', 'blogs.url'
  )
  .from('blogs')
  .innerJoin('blogs_tags','blogs.id', 'blogs_tags.blog_id')
  .innerJoin('tags','blogs_tags.tag_id', 'tags.id')
}


function getUserTags(id) {
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
