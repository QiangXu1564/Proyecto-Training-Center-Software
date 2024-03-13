const socket = io()

//First container
let username = document.getElementById('name');
let buttoninput = document.getElementById('button-input');
let container1 = document.getElementById('container-1');

//Second container
let container2 = document.getElementById('container-2');
let textchat = document.getElementById('text-chat');
let buttonchat = document.getElementById('button-chat')
let conected = document.getElementById('conected')
let chat = document.getElementById('chat')

let arr = new Array();
let n = 0;

buttoninput.addEventListener('click', function(){
    if(username.value == ""){
        alert("Por favor, escriba un nombre de usuario");
    }
    else{
        container1.style.display = 'none';
        container2.style.display = 'flex';
        socket.emit('nameindex',{
            Username: username.value
        });
        socket.emit('id', socket.id);
        socket.on('nameclient', function (data){
            let cont = false;
            if(n == 0){
                conected.innerHTML += `<p>${data.Username}</p>`
                arr[n] = data.Username;
                n++;    
            }
            else{
                for(let i = 0; i < n && cont == false; i++){
                    if(arr[i] == data.Username){
                        cont = true;
                    }
                }
                if(cont == false){
                    conected.innerHTML += `<p>${data.Username}</p>`
                    arr[n] = data.Username;
                    n++;
                }
            }
        });
    }
});

socket.on('disconnection', function (data){
    arr[data] = null;
    conected.innerHTML = "";
    for(let i = 0; i < n; i++){
        if(arr[i] != null){
            conected.innerHTML += `<p>${arr[i]}</p>`
        }   
    }
});

buttonchat.addEventListener('click', function(){
    let min = new Date()
    let hor = new Date()
    socket.emit('messageindex', {
        Username: username.value,
        Message: textchat.value,
        Min: '0' + min.getMinutes(),
        Hor: '0' + hor.getHours()
    });
    textchat.value = "";
});

socket.on('messageclient', function (data) {
    chat.innerHTML += `<p>${data.Username} (${data.Hor.substring(data.Hor.length - 2)}:${data.Min.substring(data.Min.length - 2)}): ${data.Message}</p>`
});