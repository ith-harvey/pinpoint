const express = require('express')
const router = express.Router()

const routingFunctions = require('./routingFunctions.js')
const utilityFunction = require('./utilityFunctions.js')
const db = require('../../db')

const utilFunc = require('./utilityFunctions')

router.get('/', showAllBlogs)
router.get('/new', showAddBlogForm)
router.post('/new', addBlog)

router.get('/:id', showSingleBlog)

//Vote,flag,tag a blog
  //may need to break up this route
    // ('/:id/vote')
    // ('/:id/flag')
    // ('/:id/tag')
router.put('/rating/:id', modifyBlogRating)

//Vote on a comment --> functions kept in seperate page
router.put('/:id/comments/:id', voteBlogComment)


router.post('/:id/comments', addBlogComment)

function voteBlogComment(req,res,next){

}

//check if logged in not quite working
function addBlogComment(req,res,next){
  const id = req.params.id
  const userId = req.session.userId
  const error = 'You must be logged in to comment'
  const {text} = req.body
  if(userId){
    console.log(req.body, userId)
    return db('comments')
      .insert({
        blog_id: id,
        user_id: userId,
        text: text
      },'*')
      .then((comments) => {
        res.redirect(`/blogs/${id}`)
      })
      .catch((err) => next(err))
  }
  else{
    res.render('blogs/singleBlog',{error})
  }
}



////////// Routing Functions  //////////
  //can place these functions in an external file
function showAllBlogs(req,res,next){
  return db.select(
    'blogs.title','blogs.id','tags.id AS tag_id','tags.name','blogs.rating', 'blogs.description', 'blogs.url')
  .from('blogs')
  .innerJoin('blogs_tags','blogs.id', 'blogs_tags.blog_id')
  .innerJoin('tags','blogs_tags.tag_id', 'tags.id').where({flagged: false}).then( blogs => {
    // blogs = combineTagsToBlogs(blogs)
    blogs = modfiyBlogsObject(blogs)
    res.render('blogs', {blogs, title: 'PinPoint' })
  }).catch( error => {
    console.log(error);
    next(error)
  })
}


function showSingleBlog(req,res,next){
  const id = req.params.id
  return db.select(
      'blogs.title','blogs.id','tags.id AS tag_id','tags.name','blogs.rating', 'blogs.description', 'blogs.url',
      'comments.rating AS comment_rating','comments.text','users.user_name', 'comments.id AS comments_id', 'comments.blog_id'
  )
  .from('tags')
  .fullOuterJoin('blogs_tags','tags.id','blogs_tags.tag_id')
  .fullOuterJoin('blogs','blogs_tags.blog_id','blogs.id')
  .fullOuterJoin('comments','blogs.id','comments.blog_id')
  .fullOuterJoin('users_comments_rating', 'comments.id', 'users_comments_rating.comment_id')
  .fullOuterJoin('users','users_comments_rating.user_id','users.id')
  .where('comments.blog_id',id)
  .then((blogs) => {
    blogs = modfiyBlogsObject(blogs)
    res.render('blogs/singleBlog', {blogs, title: 'PinPoint' })
  })
  .catch((err) => next(err))
}

function modfiyBlogsObject(blogs) {
  return blogs.reduce((acc, blog, index, array) => {

    const theBlogInTheNewArray = acc.filter(sortedBlog => {
      return sortedBlog.id == blog.id
    })[0]

    if(!theBlogInTheNewArray) {
      blog.tags = [{ id: blog.tag_id ,name: blog.name }]
      blog.comments = [{ user_name: blog.user_name, text: blog.text, rating: blog.comment_rating, created_at: blog.created_at, comment_id: blog.comments_id, blog_id: blog.id}]
      acc.push(blog)
    } else {
      theBlogInTheNewArray.tags.push({ id: blog.tag_id, name: blog.name })
      theBlogInTheNewArray.comments.push({ user_name: blog.user_name, text: blog.text, rating: blog.comment_rating, created_at: blog.created_at, comment_id: blog.comments_id, blog_id: blog.id })
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

  let tagsBlogsIns = utilFunc.turnIntoArray(req.body.id)


  let tagNamesIns = utilFunc.turnIntoArray(req.body.name)
  tagNamesIns = utilFunc.valueInEveryIndex(tagNamesIns)



  if(tagNamesIns) {
    console.log('this is tagNamesIns before map',tagNamesIns);
      tagNamesIns = tagNamesIns.map( specifName => {
          return {name: specifName}
      })

    console.log('what is inserted into tags: ', tagNamesIns);
    db('tags').insert(tagNamesIns).returning('id').then( insertedTagIds => {
      console.log('the id of the created tag : ', insertedTagIds);
      console.log('number of ids in the created tags array', insertedTagIds.length);

      console.log('does tagsBlogsIns exist id: ',tagsBlogsIns);
      if(tagsBlogsIns) {
        //if tagsBlogsIns is an array
        if(tagsBlogsIns.length >= 1 && Array.isArray(tagsBlogsIns)) {
          tagsBlogsIns = tagsBlogsIns.concat(insertedTagIds)
        }
          console.log('this is after we combine ids', tagsBlogsIns);
        }

    })
  }

  blogsInsertToDB()

  function blogsInsertToDB() {

    console.log('blogIns right before insert', blogIns);
    db('blogs').insert(blogIns).returning('id').then( blogId => {
      blogId = blogId[0]
      console.log('blog injection finnished');

      // if user selects existing or created tags for blog
      if(tagsBlogsIns) {
        if(tagsBlogsIns.length >= 1 && Array.isArray(tagsBlogsIns)) {
          tagsBlogsIns = tagsBlogsIns.map( individtag_id => {
            return {tag_id: individtag_id, blog_id: blogId}
          })
        }
        console.log('inside tagsblogsins right before insert to blogs_tags', tagsBlogsIns);
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


function modifyBlogRating(req,res,next){

  console.log('in modifyBlogRating');

  console.log('req dat body',req.body);
  console.log('req params id',req.params.id);

  let blogId = req.params.id

  db('blogs').select('*').where({id: req.params.id}).first().then( blog => {
    console.log('this is the blog pulled', blog);

    let updatedRating = blog.rating + Number(req.body.rating)
    console.log('what is being inserted', updatedRating);
    db('blogs').select('*').where({id: req.params.id}).update({rating: updatedRating}).returning('rating').then( result => {
      console.log('result of PUT to rating', result);

    })

  })
}



function showAddBlogForm(req,res,next){
  db('tags').then( tags =>{
    console.log(tags);
    res.render('blogs/new', { tags, title: 'Add a blog' })
  })
}



module.exports = router
