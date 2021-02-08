const mongoose = require('mongoose')

const messageSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    sender: { type: mongoose.Schema.Types.ObjectId, ref: 'user', required: true },
    message: String,
    receiver: { type: mongoose.Schema.Types.ObjectId, ref: 'user', required: true },
})

module.exports = mongoose.model('message', messageSchema)