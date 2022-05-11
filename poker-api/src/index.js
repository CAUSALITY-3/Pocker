const app = require('express')()
const http = require('http').createServer(app)
const io = require('socket.io')(http)

const port = process.env.PORT || 9000;

io.on('connection', socket => {
    socket.on('message', ({name, message}) => {
        io.emit('message', ({name, message}))
    })
})

http.listen(port, () => {
    console.log(`server is up on port ${port}!`)
})