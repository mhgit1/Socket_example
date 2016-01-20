window.onload = function(event){     //document.onload ei toimi jostain syystä
 
    console.log('Window is ready');
    //Connect to server with socket
    var socket = io();
    
    //listen new message" from server
    socket.on('new message',function(data){    //on-funktiolla kuunnellaa, emit-funktiolla lähetetään
        //Get textarea with id="message"
        var textArea = document.getElementById('message');
        textArea.value += data.name + ":" + data.message + "\n";
    });
    
    
    //Get object that has id="send"
    var btnSend = document.getElementById('send');
    
    //Add click listener for it
    btnSend.onclick = function(){
     
        var msg = document.getElementById('chat_message');
        console.log(msg.value);
        var dataToServer = {
            name:'undefined',
            message:msg.value
        }
        //Send message to server
        socket.emit('chat msg',dataToServer);     //'chat msg' voi olla mikä tahansa
    }
}