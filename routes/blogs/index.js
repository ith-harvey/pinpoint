const express = require('express')
const router = express.Router()

const routingFunctions = require('routingFunctions.js')

router.get('/', showAllBlogs)
router.get('/:id', showSingleBlog)
router.get('/new', showAddBlogForm)
router.post('/new', addBlog)



////////// Routing Functions  //////////
  //can place these functions in an external file
function showAllBlogs(req,res,next){
  res.render('blogs', { title: 'PinPoint' })
}

function showSingleBlog(req,res,next){
}

function showAddBlogForm(req,res,next){
  res.render('blogs/new', { title: 'Add a blog' })
}



module.exports = router
