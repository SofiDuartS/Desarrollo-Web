import express from "express";
import { connectDB } from "./config/database.js"; 
import { join } from "path"; 
import {__dirname} from "./util/__dirname.js"; 
import {formularioRegistro} from "./controllers/userController.js";
import {crearUsuario} from "./controllers/userController.js";
import {formularioActualizar} from "./controllers/userController.js";
import {actualizarUsuario} from "./controllers/userController.js";

const server = express();
connectDB().then(()=>{console.log('DB connected');
}).catch((error)=>{
    console.log(error);
});

server.get('/welcome', (req, res) => {
    res.send('Bienvenido al servidor');
});

server.use(express.urlencoded({extended: true})); 
server.use(express.static('public'));

server.get('/users/form', formularioRegistro); 
server.get('/users/:id', formularioActualizar); 
server.post('/users/save', crearUsuario); 
server.post('/users/update', actualizarUsuario); 


server.set('view engine', 'ejs'); 
server.set('views', join(__dirname, 'views'));

server.listen(3000, () => console.log('Servidor corriendo en el puerto 3000'));