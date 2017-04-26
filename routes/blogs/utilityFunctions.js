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



function turnIntoArray(data) {
  if(typeof data === 'string') {
    data = [data]
    return data
  } else if (data.length > 1 && Array.isArray(data)) {
    return data
  }
}

function valueInEveryIndex(arr) {
  if(arr.every( item => {return item != ''})) {
    return arr
  }
}

function removeDuplicates(originalArray, prop) {
     const newArray = []
     const lookupObject = {}

     for(let i in originalArray) {
        lookupObject[originalArray[i][prop]] = originalArray[i]
     }

     for(let i in lookupObject) {
         newArray.push(lookupObject[i])
     }
      return newArray
 }

 function sortBlogsByRating(data){
   return data.sort(blogSortCriterion)
 }

 function blogSortCriterion(a,b){
   if(parseInt(a.rating) > parseInt(b.rating)){
     return -1
   }
   else if(parseInt(a.rating) < parseInt(b.rating)){
     return 1
   }
   return 0
 }


module.exports = {

  turnIntoArray,
  valueInEveryIndex,
  removeDuplicates,
  sortBlogsByRating,
  modfiyBlogsObject


}
