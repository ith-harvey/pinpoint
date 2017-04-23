const express = require('express')
const router = express.Router()

// const routingFunctions = require('routingFunctions.js')


// router.get('/', showAllBlogs)
// router.get('/new', showAddBlogForm)
// router.post('/new', addBlog)
//
// router.get('/:id', showSingleBlog)
//
// //Vote,flag,tag a blog
//   //may need to break up this route
//     // ('/:id/vote')
//     // ('/:id/flag')
//     // ('/:id/tag')
// router.put('/:id', modifyBlog)
//
// //Vote on a comment --> functions kept in seperate page
// router.get('/:id/comments/:id', voteBlogComment)
// router.get('/:id/comments', showBlogComments)
// router.post('/:id/comments', addBlogComment)
//



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
