import express from "express";
import {__dirname} from "../util/__dirname.js";

const server = express();
// ---------- Conexion a la base de datos ----------
// connectDB().then(()=>{console.log('DB connected');
// }).catch((error)=>{
//     console.log(error);
// });
    
server.use(express.urlencoded({extended: true}));
server.use(express.static('assets')); //en el ejemplo de clase usan public, pero nuestro directorio se llama assets

// ---------- Configuración del motor de plantillas ----------
server.set('view engine', 'ejs');
server.set('views', join(__dirname, 'views'));

// ---------- Rutas ----------
// Meter aquí las rutas para ejecutar las funciones de los controladores

// server.get('/users/form', formularioRegistro); // EJEMPLO DE GET, SE PUEDE QUITAR
// server.post('/users/save', actualizarUsuario); // EJEMPLO DE POST, SE PUEDE QUITAR

server.listen(3000, () => console.log('Servidor corriendo en el puerto 3000'));