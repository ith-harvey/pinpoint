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
  return db.select('users.user_name','tags.name','blogs.title')
    .from('users')
    .innerJoin('users_tags','users.id','users_tags.user_id')
    .innerJoin('tags','users_tags.tag_id','tags.id')
    .innerJoin('blogs_tags','tags.id','blogs_tags.tag_id')
    .innerJoin('blogs','blogs_tags.blog_id','blogs.id')
    .where('users.id',id)
}

function getTagNames(userData){
  const arrayOfTags = []
  userData.forEach(innerObj => {
    arrayOfTags.push({name: innerObj['name']})
  })
  return arrayOfTags
}

module.exports = {
  checkResponse,
  checkPassword,
  retreiveUserData,
  getTagNames
}
