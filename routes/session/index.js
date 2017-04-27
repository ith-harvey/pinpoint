'use strict'

const express = require('express')
const router = express.Router()
const sessionRouting = require('./routingFunctions.js')


////////// Main Routes //////////
router.get('/', sessionRouting.showLogin)
router.post('/register',sessionRouting.authenticateNewUser)
router.post('/login',sessionRouting.authenticateExistingUser)
router.delete('/', sessionRouting.endSession)




module.exports = router
