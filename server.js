
const app = require('./app')
const http = require('http').createServer(app)
const { io } = require('./socket');
io.attach(http);
const port = process.env.PORT

const server = http.listen(port, () => {
    console.log(`Server runing at http://localhost:${server.address().port}`)
})