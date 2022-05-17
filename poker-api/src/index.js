const app = require('express')()
const server = require('http').createServer(app)
const io = require('socket.io')(server)

const port = process.env.PORT || 9000;

const users=[]
const data =[]
let a=0

io.on('connection', socket => {
    socket.on('joinpage',name=>{
        let user={id:socket.id,name,value:'',mode:false}
        socket.emit('userdata', user)
        users.push(user)
        io.emit('usersdata',users)
    })
    socket.on('estimation',data=>{
        let estUser = users.filter((user)=>user.name===data.name)[0]
        users.pop(estUser)
        estUser.value=data.value
        users.push(estUser)
        io.emit('usersdata',users)
    })  
    socket.on('disconnect', (socket) => {
        console.log(users)
        const removeUser = users.filter((user)=>user.id===socket.id)[0]
        users.pop(removeUser)
        io.emit('usersdata',users)
    })  
})

server.listen(port, () => {
    console.log(`server is up on port ${port}!`)
})



// socket.on('message', ({name, message}) => {
//     //     io.emit('message', ({name, message}))
//     // })
//     var clientIp = socket.request.connection.remoteAddress;

//   console.log(clientIp);
//     // console.log("user-agent: ",socket.request.headers['user-agent']);
//     data.push({id:socket.id,num:a})
//     a=a+1
//     io.emit('prof', data )

//     socket.on('cha',id=>{
//        let yy= data.filter((item)=>{item.id==id})
//        data.pop(yy[0])
//        yy[0].num=100
//        data.push(yy[0])
//        io.emit('prof', data )
//     })
//     socket.on('hai',data=>{
//         io.emit("hello",data)
//     })

//     users.push(socket.id)
//     io.emit('users',users)
//     // console.log(socket.id)
//     socket.on('message', (mess) => {
//         socket.emit("test","hello",socket.id)
//         io.emit('mess', mess=mess+1)
        
//     })
//     socket.on('disconnect', (socket) => {
//         users.pop(socket.id)
//         lis=data.filter((item)=> item.id==socket.id)
//         data.pop(lis[0])

//         io.emit('users', users)
//         io.emit('prof', data )
//     })