const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const cors = require('cors');

const app = express();

const server = require('http').Server(app); /*liberando conxeções http*/
const io = require('socket.io')(server); /*liberando conxeções web socket*/

mongoose.connect('mongodb+srv://sdparkjr:senha123@cluster0.y8pcwo9.mongodb.net/?retryWrites=true&w=majority', {
    useNewUrlParser: true
});

app.use((req, res, next) => {
    req.io = io;
    next();
}); /*deixando visivel para toda aplicação o socket*/

app.use(cors()); /*liberando acesso */

app.use('/files', express.static(path.resolve(__dirname, '..', 'uploads', 'resized')));

app.use(require('./routes'));

//app.listen(3333); /*porta api disponivel*/

server.listen(3333); /*porta api disponivel*/

//http://localhost:3333/
//http://localhost:3333?name=AAAA