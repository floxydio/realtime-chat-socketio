let PORT = process.env.PORT || 5000;
const { Socket } = require('dgram');

let app = require('express')();
let http = require('http').createServer(app);
let io = require('socket.io')(http);

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});


http.listen(3000, () => {
    console.log('Connected done');
  });

io.on('connection', (socket) => {
  console.log('There is a Connection');

  socket.on('disconnection', () => {
      console.log('Disconnect');
    })

    socket.on('Created', (data) => {
        socket.broadcast.emit('Created', (data))
    })

    socket.on('chat-message', (data) => {
        socket.broadcast.emit('chat-message', (data))
    })
    socket.on('typing', (data) => {
        socket.broadcast.emit('typing', (data))
    })
    socket.on('stoptyping', (data) => {
        socket.broadcast.emit('stoptyping', (data))
    })

    socket.on('joined', (name) => {
        socket.broadcast.emit('joined', (name))
    })
    socket.on('leaved', (name) => {
      socket.broadcast.emit('leaved', (name))
  })

});