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
  const id = req.params.id
  return db.select('blogs.title', 'blogs.id','comments.rating','comments.text','users.user_name')
    .from('blogs')
    .innerJoin('comments', 'blogs.id', 'comments.blog_id')
    .innerJoin('users_comments_rating', 'comments.id', 'users_comments_rating.comment_id')
    .innerJoin('users','users_comments_rating.user_id','users.id')
    .where('blogs.id',id)
    .then((comments) => {
      console.log(comments)
      res.render('blogs/comments',{comments})
    })
    .catch((err) => next(err))
}


function addBlogComment(req,res,next){
  const id = req.params.id
  return db('comments')
    .insert()
    .where()
    .then()
    .catch((err) => next(err))
}



////////// Routing Functions  //////////
  //can place these functions in an external file
function showAllBlogs(req,res,next){
  return db.select(
    'blogs.title','blogs.id','tags.id AS tag_id','tags.name','blogs.rating', 'blogs.description', 'blogs.url')
  .from('blogs')
  .innerJoin('blogs_tags','blogs.id', 'blogs_tags.blog_id')
  .innerJoin('tags','blogs_tags.tag_id', 'tags.id').where({flagged: false}).then( blogs => {
    blogs = combineTagsToBlogs(blogs)
    res.render('blogs', {blogs, title: 'PinPoint' })
  }).catch( error => {
    console.log(error);
    next(error)
  })
}

function showSingleBlog(req,res,next){
  console.log('in showSingleBlog');
  console.log('req.params.id',req.params.id);
  return db.select(
    'blogs.title','blogs.id','tags.id AS tag_id','tags.name','blogs.rating', 'blogs.description', 'blogs.url'
  )
  .from('blogs')
  .innerJoin('blogs_tags','blogs.id', 'blogs_tags.blog_id')
  .innerJoin('tags','blogs_tags.tag_id', 'tags.id')
  .where('blogs.id',req.params.id)
  .then( blogs => {
    blogs = combineTagsToBlogs(blogs)
    console.log('blog combine',blogs[0]);
    res.render('blogs/singleBlog', {blogs, title: 'PinPoint' })
  }).catch( error => {
    console.log(error);
    next(error)
  })
}

// function showSingleBlog(req,res,next){
//   return db.select(
//       'blogs.title','blogs.id','tags.id AS tag_id','tags.name','blogs.rating', 'blogs.description', 'blogs.url',
//       'comments.rating','comments.text','users.user_name')
// }





function combineTagsToBlogs(blogs) {

  return blogs.reduce( (acc, blog, index, array )=> {

  let theBlogInTheNewArray = acc.filter(sortedBlog => {
    return sortedBlog.id == blog.id
  })[0]

  if(!theBlogInTheNewArray) {
    blog.tags = [{ id: blog.tag_id ,name: blog.name }]
    acc.push(blog)
  } else {
    theBlogInTheNewArray.tags.push({ id: blog.tag_id, name: blog.name })
  }
  return acc
  },[])
}



function addBlog(req,res,next){

  console.log('reqdatbody',req.body);
  let blogIns = {
    title: req.body.title,
    description: req.body.description,
    url: req.body.url,
  }
  let tagsBlogsIns = req.body.id
  let tagNamesIns = req.body.name

  if(tagNamesIns) {
    if(typeof tagNamesIns === 'string') {
      tagNamesIns = {name: tagNamesIns}
    }
    if(tagNamesIns.length >= 1 && Array.isArray(tagNamesIns)) {
      tagNamesIns = tagNamesIns.map( specifName => {
          return {name: specifName}
      })
    }
    console.log('what is inserted into tags: ', tagNamesIns);
    db('tags').insert(tagNamesIns).returning('id').then( insertedTagIds => {
      console.log('the id of the created tag : ', insertedTagIds);
      console.log('number of ids in the created tags array', insertedTagIds.length);

      if(insertedTagIds.length == 1) {
        console.log('we think just one id was created');
        insertedTagIds = insertedTagIds[0]
      }

      console.log('does tagsBlogsIns exist id: ',tagsBlogsIns);
      if(tagsBlogsIns) {
        //if tagsBlogsIns is an array
        if(tagsBlogsIns.length >= 1 && Array.isArray(tagsBlogsIns)) {
            tagsBlogsIns.push(insertedTagIds)
        }

        //if tagsBlogsIns is one item
        if(typeof tagsBlogsIns === 'string') {
          console.log('tagsBlogsIns right before we combine with the created id: ',tagsBlogsIns);
          tagsBlogsIns = [tagsBlogsIns]
          tagsBlogsIns = tagsBlogsIns.concat(insertedTagIds)
          console.log('this is after we combine ids', tagsBlogsIns);
        }

      }
    })
  }

  blogsInsertToDB()

  function blogsInsertToDB() {

    db('blogs').insert(blogIns).returning('id').then( blogId => {
      blogId = blogId[0]
      console.log('blog injection finnished');

      if(tagsBlogsIns) {
        if(typeof tagsBlogsIns === 'string') {
          tagsBlogsIns = {tag_id: tagsBlogsIns, blog_id: blogId}
        }
        if(tagsBlogsIns.length >= 1 && Array.isArray(tagsBlogsIns)) {
          tagsBlogsIns = tagsBlogsIns.map( individtag_id => {
            return {tag_id: individtag_id, blog_id: blogId}
          })
          console.log('inside inner tagsblogsins', tagsBlogsIns);
        }

        db('blogs_tags').insert(tagsBlogsIns).then( () => {
          res.redirect('/blogs')
          console.log('blogs_tags injection finnished');
        })
      }
    // }).catch( error => {
    //   next(error)
    // })
    })
  }
}


function modifyBlog(req,res,next){

}



function showAddBlogForm(req,res,next){
  db('tags').then( tags =>{
    console.log(tags);
    res.render('blogs/new', { tags, title: 'Add a blog' })
  })
}



module.exports = router
