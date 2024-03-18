//Aquí importamos todo lo que queremos 
const path = require('path')
const express = require('express'); //ayuda a escribir el codigo del servidor (reutiliza codigo) (1) npm install express
const socketio = require('socket.io'); //sirve para establecer conexion en tiempo real y funciona encima de un servidor, es decir debe haber ya un servidor creado (5)


const app = express(); //nos devuelve un objeto de js con funciones y metodos... (2)
app.use(express.static(path.join(__dirname, 'public')));
//se encaraga de ejecutar un servidor que se queda escuchando en algún puerto de nuestro ordenador (3) (empieza el servidor)
const server = app.listen(3000, () => { 
    console.log('Servidor en el puerto 3000') //escuchamos puerto 8080
});

const io = socketio(server); //escucho el servidor en tiempo real (8)
//Conectamos el cliente con el servidor (9) (esto nos permite tener código js disponible para nuestro servidor, gracias a io, por lo que en el código html podremos utilizar esto)
io.on('connection', (socket) => {
    console.log('Nuevo usuario conectado, su id es:', socket.id);
});
