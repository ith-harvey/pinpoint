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


//may need to modify this validation methodology
function checkPassword(passwordStr){
  return passwordStr.split('').length <= 8 ? true : false
}

module.exports = {
  checkResponse,
  checkPassword
}
