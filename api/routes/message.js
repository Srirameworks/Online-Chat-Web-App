const express = require('express')
const router = express.Router()

const message = require('../models/message')

const Message = require('../models/message')

const Messagecontroller = require('../controller/message')

router.get('/:senderId&:receiverId', Messagecontroller.message_get_by_Id_Id)

router.post('/', Messagecontroller.message_post)


module.exports = router