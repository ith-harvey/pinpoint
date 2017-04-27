const db = require('../../db')

function checkResponse(addedUser){
  const emailError = {status: 400, message: 'Email must not be blank'}
  const passwordError = {status: 400, message: 'Password must be longer than 8 characters'}
  if(!addedUser.email){
    return false
  }
  else if(checkPassword(addedUser.password)) {
    return false
  }
  return true
}

function checkPassword(passwordStr){
  return passwordStr.split('').length <= 4 ? true : false
}


//retreive all users and tag info that match the user id passed in through req.params
function retreiveUserData(id){
  return db.select('users.user_name','tags.name', 'blogs.id AS blog_id', 'tags.id AS tag_id','blogs.title','blogs.rating','blogs.description', 'blogs.url')
    .from('users')
    .innerJoin('users_tags','users.id','users_tags.user_id')
    .innerJoin('tags','users_tags.tag_id','tags.id')
    .innerJoin('blogs_tags','tags.id','blogs_tags.tag_id')
    .innerJoin('blogs','blogs_tags.blog_id','blogs.id')
    .where('users.id',id)
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

 function buildSingleBlogObj(data){
   const outputArray = data.map(item => {
     const {user_name,name,blog_id,tag_id,title,rating,description,url} = item
     const newObj = {user_name,name,blog_id,tag_id,title,rating,description,url}
     newObj['tags'] = []
     return newObj
   })

   const uniqueOutputArray = removeDuplicates(outputArray,'title')

   return uniqueOutputArray.map(item => {
     item.tags.push(...getTagNames(data,item.blog_id))
     return item
   })
 }


 function getTagNames(userData,id){
   const arrayOfTags = []
   userData.forEach(innerObj => {
     if(innerObj.blog_id === id){
       arrayOfTags.push({name: innerObj['name']})
     }
   })
   return arrayOfTags
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

 function turnIntoArray(data) {
   if(typeof data === 'string') {
     data = [data]
     return data
   } else if (data.length > 1 && Array.isArray(data)) {
     return data
   }
 }



module.exports = {
  checkResponse,
  checkPassword,
  retreiveUserData,
  getTagNames,
  removeDuplicates,
  buildSingleBlogObj,
  turnIntoArray,
  sortBlogsByRating
}
