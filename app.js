const express = require('express')
const app = express()
const bodeparser = require('body-parser')
const mongoose = require('mongoose')


const UserRouter = require('./api/routes/user')
const MessageRouter = require('./api/routes/message')

app.use(bodeparser.urlencoded({ extended: true }))
app.use(bodeparser.json())

const url = 'mongodb+srv://' + process.env.MONGO_UN + ':' + process.env.MONGO_PW + '@cluster0.zjqez.mongodb.net/' + process.env.MONGO_db + '?retryWrites=true&w=majority';
mongoose.connect(url,
    {
        useUnifiedTopology: true,
        useNewUrlParser: true,
        useCreateIndex: true
    }).then(() => {
        console.log("Connected to the Database.")
    }).catch(err => {
        console.log(err);
    });

app.use((req, res, next) => {

    res.header("Access-Control-Allow-Origin", "*")
    res.header("Access-Control-Allow-Headers",
        "Origin,X-Requested-With,Content-Type,Accept,Authorization")
    if (req.method === "OPTIONS") {
        res.header("Access-Control-Allow-Methods", "PUT,POST,PATCH,DELETE,GET")
        return res.status(200).json({})
    }
    next()
})

app.use('/app', express.static('app'))
app.use('/images', express.static(__dirname + 'app/images'))
app.use('/app/user', UserRouter)
app.use('/app/message', MessageRouter)




app.use((req, res, next) => {
    const error = new Error('Resource not found!')
    error.status = 404
    next(error)
})
app.use((error, req, res, next) => {
    res.status(error.status || 500)
    res.json({
        error: {
            message: error.message
        }
    })
})

module.exports = app