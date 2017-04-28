const express = require('express')
const router = express.Router()

const routingFunctions = require('./routingFunctions.js')
const utilityFunction = require('./utilityFunctions.js')
const db = require('../../db')

const iofunc = require('../../lib/io')

const utilFunc = require('./utilityFunctions')

router.get('/', showAllBlogs)
router.get('/new', showAddBlogForm)
router.post('/new', addBlog)

//retreives information used to search on page
router.get('/api', getBlogData)

router.get('/:id', showSingleBlog)


router.put('/rating/:id', authorize, modifyBlogRating)

//Vote on a comment --> functions kept in seperate page
router.put('/comments/:id', authorize, modifyCommentRating)

router.post('/:id/comments', authorize, addBlogComment)




function authorize(req,res,next){
  const error = {status: 401, message: 'You must be logged in to access this feature'}
  if(req.session.userId){
    return next()
  }
  else{
    console.error(error)
    next(error)
    // res.redirect('/blogs')
  }
}




function modifyCommentRating(req,res,next) {

    let commentId = req.params.id
    db('comments').select('*').where({id: req.params.id}).first().then( comment => {
      let updatedRating = comment.rating + Number(req.body.votevalue)
      updatedRating = updatedRating.toString()

      db('comments').where({id: req.params.id}).update('rating', updatedRating).returning('*').then( result => {
        result = {
          id: result[0].id,
          rating: result[0].rating
        }
        //calling socket function
        iofunc.updateCommentRating(result)
      })

    })
    .catch((err) => next(err))
}

function addBlogComment(req,res,next){
  const id = req.params.id
  const userId = req.session.userId
  const error = {message: 'You must be logged in to comment'}
  const {text} = req.body
  if(userId) {
    return db('comments').insert({blog_id: id,user_id: userId,text: text}).returning('*').then(comment => {

      db('users').where({id: comment[0].user_id}).returning('*').first().then( user => {
        comment[0].user_name = user.user_name
        iofunc.postComment(comment[0])
      })
    })
    .catch((err) => {
      next(err)
    })
  } else {
    res.render('blogs/singleBlog',{error})
  }
}








function showAllBlogs(req,res,next){
  const userId = req.session.userId

  return db.select(
    'blogs.title','blogs.id','tags.id AS tag_id','tags.name','blogs.rating', 'blogs.description', 'blogs.url')
  .from('blogs')
  .innerJoin('blogs_tags','blogs.id', 'blogs_tags.blog_id')
  .innerJoin('tags','blogs_tags.tag_id', 'tags.id').where({flagged: false}).then( blogs => {
    blogs = utilFunc.sortBlogsByRating(utilFunc.modfiyBlogsObject(blogs))
    res.render('blogs', {blogs, title: 'PinPoint', userId})
  }).catch( error => {
    console.error(error);
    next(error)
  })
}

function getBlogData(req,res,next){
  return db.select(
    'blogs.title','blogs.id','tags.id AS tag_id','tags.name','blogs.rating', 'blogs.description', 'blogs.url')
  .from('blogs')
  .innerJoin('blogs_tags','blogs.id', 'blogs_tags.blog_id')
  .innerJoin('tags','blogs_tags.tag_id', 'tags.id').where({flagged: false}).then( blogs => {
    blogs = utilFunc.sortBlogsByRating(utilFunc.modfiyBlogsObject(blogs))
    res.json(blogs)
  }).catch( error => {
    console.error(error);
    next(error)
  })
}

//Add a function to sort comments by date posted
function showSingleBlog(req,res,next){
  const userId = req.session.userId
  const id = req.params.id
  return Promise.all([getBlog(id),getComments(id),getTags(id)])
    .then((result) => {
      result[0][0].comments = result[1]
      result[0][0].tags = utilFunc.removeDuplicates(result[2],'name')
      console.log('what is sent when we show a blog',result[0][0].comments);
      res.render('blogs/singleBlog', {blogs: result[0], title: 'PinPoint', userId })
    })
    .catch((err) => next(err))
}

function getBlog(id){
  return db('blogs').where('blogs.id',id)
}

//modify this object so that it also returns the user who created that comment
function getComments(id){
  return db.select('comments.rating AS comment_rating','comments.text', 'comments.created_at','users.user_name', 'comments.id AS comments_id')
    .from('comments')
    .fullOuterJoin('users_comments_rating','comments.id','users_comments_rating.comment_id')
    .fullOuterJoin('users','users_comments_rating.user_id','users.id')
    .where('comments.blog_id',id)
}


function getTags(id){
  return db.select('tags.id AS tag_id','tags.name')
    .from('tags')
    .fullOuterJoin('blogs_tags','tags.id','blogs_tags.tag_id')
    .fullOuterJoin('blogs','blogs_tags.blog_id','blogs.id')
    .where('blogs.id',id)
}



function addBlog(req,res,next){

  let blogIns = {
    title: req.body.title,
    description: req.body.description,
    url: req.body.url,
  }

  let tagsBlogsIns = utilFunc.turnIntoArray(req.body.id)


  let tagNamesIns = utilFunc.turnIntoArray(req.body.name)
  tagNamesIns = utilFunc.valueInEveryIndex(tagNamesIns)



  if(tagNamesIns) {
      tagNamesIns = tagNamesIns.map( specifName => {
          return {name: specifName}
      })

    db('tags').insert(tagNamesIns).returning('id').then( insertedTagIds => {


      if(tagsBlogsIns) {
        //if tagsBlogsIns is an array
        if(tagsBlogsIns.length >= 1 && Array.isArray(tagsBlogsIns)) {
          tagsBlogsIns = tagsBlogsIns.concat(insertedTagIds)
        }
        }

    })
    .catch((err) => next(err))
  }

  blogsInsertToDB()

  function blogsInsertToDB() {

    db('blogs').insert(blogIns).returning('id').then( blogId => {
      blogId = blogId[0]

      // if user selects existing or created tags for blog
      if(tagsBlogsIns) {
        if(tagsBlogsIns.length >= 1 && Array.isArray(tagsBlogsIns)) {
          tagsBlogsIns = tagsBlogsIns.map( individtag_id => {
            return {tag_id: individtag_id, blog_id: blogId}
          })
        }
        db('blogs_tags').insert(tagsBlogsIns).then( () => {
          res.redirect('/blogs')
        })
      }
    })
  }
}


function modifyBlogRating(req,res,next){

  let blogId = req.params.id

  db('blogs').select('*').where({id: req.params.id}).first().then( blog => {

    let updatedRating = blog.rating + Number(req.body.votevalue)
    updatedRating = updatedRating.toString()

    db('blogs').where({id: req.params.id}).update('rating', updatedRating).returning('*').then( result => {
      result = {
        id: result[0].id,
        rating: result[0].rating
      }
      //calling socket function
      iofunc.updateBlogRating(result)
    })
    .catch((err) => next(err))

  })
  .catch((err) => next(err))
}



function showAddBlogForm(req,res,next){
  const userId = req.session.userId
  db('tags').then( tags =>{
    res.render('blogs/new', { tags, title: 'Add a blog', userId })
  })
}



module.exports = router
