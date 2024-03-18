const path = require('path');
const express = require('express');
const app = express();

let arr = new Array(), arr2 = new Array(), arrM = new Array(), arrU = new Array(), arrMin = new Array(), arrHor = new Array();
let m = 0;
let n = 0;
//Pone el servidor
app.set('port', process.env.PORT || 8080);
//Archivos estáticos
app.use(express.static(path.join(__dirname, 'html')));
//Ejecuta el servidor
const server = app.listen(app.get('port'), () => {
    console.log('Server on port', app.get('port'));
});

//Websockets
const socketio = require('socket.io');
const io = socketio(server);

io.on('connection', (socket) => {
    console.log('New connection', socket.id);
    socket.on('nameindex', (data) =>{
        arr[n] = data;
        arr2[n] = socket.id;
        n++;
        for(let i = 0; i < n; i++){
            io.sockets.emit('nameclient', arr[i]);
        }
    });

    socket.on('id', (data) => {
        for(let i = 0; i < m; i++){
            io.to(data).emit('messageclient', {
                Username: arrU[i],
                Message: arrM[i],
                Min: arrMin[i],
                Hor: arrHor[i] 
            });
        }
    });

    socket.on('messageindex', (data) =>{
        io.sockets.emit('messageclient', data);
        arrU[m] = data.Username;
        arrM[m] = data.Message;
        arrMin[m] = data.Min;
        arrHor[m] = data.Hor;
        m++;
    });

    socket.on('disconnect', () =>{
        let pos;
        for(let i = 0; i < n; i++){
            if(arr2[i] == socket.id && arr2[i] != null){
                pos = i;
            }
        }
        console.log('Client', socket.id, 'has been disconected');
        io.sockets.emit('disconnection', pos);
        arr[pos] = null;
        arr2[pos] = null;
    });
});
