const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')

const UserController = require('../controller/user')

router.get('/', UserController.user_get)

router.get('/:id', UserController.user_get_id)

router.post('/', UserController.user_post)

module.exports = router