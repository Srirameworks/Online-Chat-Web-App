const mongoose = require('mongoose')

const User = require('../models/user')
const { io } = require('../../socket');
exports.user_get = (req, res, next) => {
    User.find()
        .select('_id Name')
        .exec()
        .then(docs => {

            const user = {
                userlist: docs.map(doc => {
                    return {
                        _id: doc._id,
                        Name: doc.Name
                    }
                })
            }
            console.log(user)
            res.status(200).json(user)
        }).catch(err => {
            console.log(err)
            res.status(500).json({
                error: err
            })
        })
}

exports.user_get_id = (req, res, next) => {
    var id = req.params.id
    User.find({ $nor: [{ '_id': id }] })
        .select('_id Name')
        .exec()
        .then(docs => {
            const user = {
                list: docs.map(doc => {
                    return {
                        _id: doc._id,
                        Name: doc.Name
                    }
                })
            }
            console.log(user)
            res.status(200).json(user)
        }).catch(err => {
            console.log(err)
            res.status(500).json({
                error: err
            })
        })
}

exports.user_post = (req, res, next) => {

    User.find({ Name: req.body.Name })
        .exec()
        .then(user => {
            if (user.length >= 1) {
                return res.status(409).json({
                    message: "User exists"

                })
            } else {
                const user = new User({
                    _id: new mongoose.Types.ObjectId,
                    Name: req.body.Name
                })
                user.save()
                    .then(result => {
                        const createduser = {
                            _id: result._id,
                            Name: result.Name
                        }
                        res.status(201).json({ createduser })
                        io.emit('adduser', createduser)
                    }).catch(err => {
                        console.log(err)
                        res.status(500).json({
                            error: err
                        })
                    })
            }
        })

}