'use strict'

const express = require('express')
const router = express.Router()
const sessionRouting = require('./routingFunctions.js')

//http://expressjs-book.com/index.html%3Fp=128.html


////////// Main Routes //////////
router.get('/', sessionRouting.showLogin)
router.post('/', sessionRouting.authenticateUser)
router.delete('/', sessionRouting.endSession)




module.exports = router
