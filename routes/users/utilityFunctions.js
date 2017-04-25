const db = require('../../db')

function checkResponse(addedUser){
  const emailError = {status: 400, message: 'Email must not be blank'}
  const passwordError = {status: 400, message: 'Password must be longer than 8 characters'}

  if(!addedUser.email){
    return emailError
  }
  else if(checkPassword(addedUser.password)) {
    return passwordError
  }
  return userData
}

function checkPassword(passwordStr){
  return passwordStr.split('').length <= 8 ? true : false
}


//retreive all users and tag info that match the user id passed in through req.params
function retreiveUserTags(id){
  return db.select('users.user_name','tags.name')
    .from('users')
    .innerJoin('users_tags','users.id','users_tags.user_id')
    .innerJoin('tags','users_tags.tag_id','tags.id')
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
  retreiveUserTags,
  getTagNames
}
