//corremos el servidor con nodemon index.js
const paht = require('path');
const express = require('express');
const app =  express();

//configuraciones del servidor
app.set('port', process.env.PORT || 3000);//puerto

//sttic files
app.use(express.static(paht.join(__dirname, 'public')));


//inciamos el servidor
const server= app.listen(app.get('port'), ()=>{//mantenemos un listening en el puerto que definimos, 3000
    console.log('Server on port', app.get('port'));
});


//web sockets, iniciamos el servidor
const SocketIO = require('socket.io');
const io= SocketIO(server);

io.on('connection', (socket)=>{
    console.log('new connection', socket.id);
    
    socket.on('chat:message', (data)=>{//recivimos los datos enviados del mesjae
        io.sockets.emit('chat:message', data);//emitimos elmesaje recivido a todos los sockets(incluyendome) conectados, es decir a todos los uduarios que se hayan conectado
    });

    //le indicamos al servidor que cuando escuhes el evento chat:typing
    socket.on('chat:typing', (data)=>{
          socket.broadcast.emit('chat:typing', data);//emitimos a todos los usuarios(excluyendome) el mesaje de quien esta escribiendo
    })
});

