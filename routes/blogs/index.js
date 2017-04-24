const express = require('express')
const router = express.Router()

const routingFunctions = require('./routingFunctions.js')
const utilityFunction = require('./utilityFunctions.js')
const db = require('../../db')

router.get('/', showAllBlogs)
router.get('/new', showAddBlogForm)
router.post('/new', addBlog)

router.get('/:id', showSingleBlog)

//Vote,flag,tag a blog
  //may need to break up this route
    // ('/:id/vote')
    // ('/:id/flag')
    // ('/:id/tag')
router.put('/:id', modifyBlog)

//Vote on a comment --> functions kept in seperate page
router.get('/:id/comments/:id', voteBlogComment)
router.get('/:id/comments', showBlogComments)
router.post('/:id/comments', addBlogComment)

function voteBlogComment(req,res,next){

}

function showBlogComments(req,res,next){

}
function addBlogComment(req,res,next){

}


////////// Routing Functions  //////////
  //can place these functions in an external file
function showAllBlogs(req,res,next){
  return db.select(
    'blogs.title','blogs.id','tags.name','blogs.rating', 'blogs.description', 'blogs.url'
  )
  .from('tags')
  .innerJoin('blogs_tags','tags.id', 'blogs_tags.tag_id')
  .innerJoin('blogs','blogs_tags.blog_id', 'blogs.id').where({flagged: false}).then( blogs => {
    console.log('blogs', blogs);
    db('tags').select('*').then( tags => {
      res.render('blogs', { blogs, tags, title: 'PinPoint' })
    })

  }).catch( error => {
    console.log(error);
    next(error)
  })


}

function showSingleBlog(req,res,next){
  console.log('in showSingleBlog');
  console.log('req.params.id',req.params.id);
  return db.select(
    'blogs.id','blogs.title','tags.name','blogs.rating', 'blogs.description', 'blogs.url'
  )
  .from('blogs')
  .innerJoin('blogs_tags','blogs_tags.blog_id', 'blogs.id')
  .innerJoin('tags','tags.id', 'blogs_tags.tag_id').where('blogs.id', req.params.id).then( blogs => {
      res.render('blogs/singleBlog', { blogs, title: 'PinPoint' })
  }).catch( error => {
    console.log(error);
    next(error)
  })
}

function addBlog(req,res,next){

}

function modifyBlog(req,res,next){

}



function showAddBlogForm(req,res,next){
  res.render('blogs/new', { title: 'Add a blog' })
}



module.exports = router
