const socket = io() 

//DOM elements
let message=document.getElementById('message');
let username=document.getElementById('username');
let btn=document.getElementById('send');
let output=document.getElementById('output');
let actions=document.getElementById('actions');

btn.addEventListener('click', function(){
    socket.emit('chat:message', {//mandamos lso datos del mensaje al servidor bajo el vento de chat.message
        username: username.value,
        message:message.value
    })
    //console.log(username.value, message.value)
});

//colocando un listener el input de mensaje
message.addEventListener('keypress', function(){
    socket.emit('chat:typing', username.value);//emitimos un evento bajo el nombre chat:typing, el cual mandamos el nombre de usuario para indicar de ese usuario esta escribiendo
})

socket.on('chat:message', function(data){//recivimso los dartos que haya emitido el servidor
    output.innerHTML=`<p>
    <strong>${data.username}</strong>: ${data.message}
    </p>`
});

 //creamos un escucha para la emicion del evento de quien esta escribiendo. La funcion escucha o revive los datos 
socket.on('chat:typing', function(data){//recivimos el evento y la informacion que nos envia el servido sobre el evento de quien esta escribiendo
    actions.innerHTML=`<p><em>${data} esta escribiendo</em></p>`
})
