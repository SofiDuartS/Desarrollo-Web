import express from "express";
import { connectDB } from "./config/database.js"; // Importamos la función connectDB del archivo database.js
// import {UserModel} from "models/userModel.js"; // Importamos el modelo UserModel del archivo user.js
import { join } from "path"; // Importamos la función join del módulo path para unir rutas
import {__dirname} from "./util/__dirname.js"; // Importamos la constante __dirname del archivo __dirname.js
import {formularioRegistro} from "./controllers/userController.js";
import {crearUsuario} from "./controllers/userController.js";
import {formularioActualizar} from "./controllers/userController.js";
import {actualizarUsuario} from "./controllers/userController.js";

const server = express();
connectDB().then(()=>{console.log('DB connected');
}).catch((error)=>{
    console.log(error);
});// Llamamos a la función connectDB para conectar a la base de datos

// server.get(ruta, peticion, respuesta){
//     instruccion a ejecutar;}
// });
server.get('/welcome', (req, res) => {
    res.send('Bienvenido al servidor');
});

server.use(express.urlencoded({extended: true})); // Middleware para poder leer los datos de un formulario
server.use(express.static('public'));

server.get('/users/form', formularioRegistro); // Llamamos a la función obtenerDatosModelo cuando se haga una petición a la ruta /usuarios
server.get('/users/:id', formularioActualizar); // Llamamos a la función obtenerDatosModelo cuando se haga una petición a la ruta /usuarios
server.post('/users/save', crearUsuario); // Llamamos a la función crearUsuario cuando se haga una petición POST a la ruta /usuarios
server.post('/users/update', actualizarUsuario); // Llamamos a la función crearUsuario cuando se haga una petición POST a la ruta /usuarios

// Un ejemplo para vistas
server.set('view engine', 'ejs'); // Configuramos el motor de vistas
server.set('views', join(__dirname, 'views')); // Configuramos la carpeta de vistas. El path.join(__dirname, 'views') es para que busque la carpeta views en la raíz del proyecto

server.listen(3000, () => console.log('Servidor corriendo en el puerto 3000'));