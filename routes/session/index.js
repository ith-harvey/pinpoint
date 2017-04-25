'use strict'

const express = require('express')
const router = express.Router()
const sessionRouting = require('./routingFunctions.js')

//http://expressjs-book.com/index.html%3Fp=128.html

////////// Main Routes //////////
router.get('/', showLogin)
router.post('/', authenticateUser)
router.delete('/', endSession)




module.exports = router
