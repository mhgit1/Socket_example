var express = require('express')();  //Ladataan moduuli ja kutsutaan samalla funktiota. korvaa tämän: var app = express();
var http = require('http').Server(express);

//Create server socket
var io = require('socket.io')(http);

//listen "connection" message from client socket
io.on('connection',function(socket){
 
    console.log('Connected');
    
    //listen "chat msg" message from ANY client
    socket.on('chat msg',function(data){
        
        //Broadcast message to all connected clients
        io.emit('new message',data);
    });
});

//make roo context router to return index.html
express.get('/',function(req,res){

    res.sendfile('index.html');
});

//oikaisemalla tehty tapa hakea tiedosto
express.get('/chat_scripts.js',function(req,res){

    res.sendfile('chat_scripts.js');
});

http.listen(3000,function(){
   console.log('Listening on *:3000'); 
});