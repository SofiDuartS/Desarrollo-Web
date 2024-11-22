import express, {json} from "express";
import {__dirname} from "./util/__dirname.js";
import {join} from "path";

import {connectDB} from "./config/database.js";
import {consultarActividades, crearActividad, obtenerActividadPorId, actualizarActividad, eliminarActividad, formularioActualizarActividad, formularioRegistroActividad, consultarActividadesTitulo} from "./controllers/activityController.js";
import { crearUsuario, formularioRegistroUsuario, obtenerUsuarioPorId, formularioActualizarUsuario, actualizarUsuario } from "./controllers/userController.js";


const server = express();
// ---------- Conexion a la base de datos ----------
connectDB().then(()=>{console.log('Base de datos conectada');
}).catch((error)=>{
    console.log(error);
});
    
server.use(express.urlencoded({extended: true}));
server.use(express.static('assets')); //en el ejemplo de clase usan public, pero nuestro directorio se llama assets
server.use(json());

// ---------- Rutas ----------
// Meter aquí las rutas para ejecutar las funciones de los controladores

server.get('/actividades', consultarActividades);
server.post('/actividades/crear', crearActividad);
server.get('/actividades/crear', formularioRegistroActividad);
server.get('/actividades/actividad/:id', obtenerActividadPorId);
server.post('/actividades/actualizar', actualizarActividad);
server.get('/actividades/actualizar/:id', formularioActualizarActividad);
server.post('/actividades/eliminar/:id', eliminarActividad);
server.get('/actividades/:titulo', consultarActividadesTitulo); 

server.post('/usuarios/crear', crearUsuario);
server.get('/usuarios/crear', formularioRegistroUsuario);
server.get('/usuarios/modificar/:id', obtenerUsuarioPorId);
server.post('/usuarios/actualizar', actualizarUsuario);
server.get('/usuarios/actualizar/:id', formularioActualizarUsuario);



// La última ara que se muestre un título diferente dependiendo de si la acción que se quiera hacer. Por ejemplo, si se quiere consultar, se muestra "Consultar actividades", si se quiere actualizar, se muestra "Actualizar actividad", etc.

// ---------- Configuración del motor de plantillas ----------
server.set('view engine', 'ejs');
server.set('views', join(__dirname, 'views'));

// ---------- Método para manejar solicitudes DELETE desde un formulario (method-override) ----------
import methodOverride from "method-override";
server.use(methodOverride("_method"));


server.listen(3000, () => console.log('Servidor corriendo en el puerto 3000'));