
const mongoose = require('mongoose')

const Message = require('../models/message')
const { io } = require('../../socket');

exports.message_post = (req, res, next) => {

    const senderId = req.body.sender
    const receiverId = req.body.receiver
    const Newmessage = req.body.Newmessage
    const message = new Message({
        _id: new mongoose.Types.ObjectId,
        sender: senderId,
        message: Newmessage,
        receiver: receiverId
    })

    message.save()
        .then(result => {
            const createmessage = {
                _id: result._id,
                sender: result.sender,
                message: result.message,
                receiver: result.receiver
            }
            res.status(201).json({ createmessage })
            io.emit('addmessage', createmessage)
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({
                error: err
            })
        })
}

exports.message_get_by_Id_Id = (req, res, next) => {
    const sender = req.params.senderId
    const receiver = req.params.receiverId
    Message.find({ sender: sender, receiver: receiver })
        .select('message')
        .exec()
        .then(docs => {
            const message = {
                messagelist: docs.map(doc => {
                    return {
                        message: doc.message
                    }
                })
            }
            console.log(message)
            res.status(200).json(message)

        }).catch(err => {
            console.log(err)
            res.status(500).json({
                error: err
            })
        })
}