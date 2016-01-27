window.onload = function(event){     //document.onload ei toimi jostain syystä
 
    console.log('Window is ready');
    //Connect to server with socket
    var socket = io();
    
    //listen new message" from server
    socket.on('new message',function(data){    //on-funktiolla kuunnellaa, emit-funktiolla lähetetään
        
        if(data.to == ""){
            //Get textarea from html with id="message"
            var textArea = document.getElementById('message');
            textArea.value += data.name + ":" + data.message + "\n";
        }
        else{
            
            var sender = document.getElementById('senderName');
            if(data.to == sender.value || data.name == sender.value){
                
                var textArea = document.getElementById('message');
                textArea.value += data.name + ":" + data.message + "\n";
            }
            else{
                //Textarea is not updated
            }
        }
    });
    
    
    //Get object that has id="send"
    var btnSend = document.getElementById('send');
    
    //Add click listener for it
    btnSend.onclick = function(){
     
        var msg = document.getElementById('chat_message');
        var sender = document.getElementById('senderName');
        var receiver = document.getElementById('receiverName');
        
        console.log(msg.value);
        console.log(sender.value);
        console.log(receiver);
        
        var dataToServer = {
            //name:'undefined',
            name:sender.value,
            message:msg.value,
            to:receiver.value
        }
        //Send message to server
        socket.emit('chat msg',dataToServer);     //'chat msg' voi olla mikä tahansa
        
        document.getElementById('chat_message').value = "";
    }
}