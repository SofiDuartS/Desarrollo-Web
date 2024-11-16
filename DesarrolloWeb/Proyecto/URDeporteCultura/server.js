import express, {json} from "express";
import {__dirname} from "./util/__dirname.js";
import {join} from "path";

import {connectDB} from "./config/database.js";
import {consultarActividades, crearActividad, obtenerActividadPorId, actualizarActividad, eliminarActividad, formularioActualizarActividad, formularioRegistroActividad} from "./controllers/activityController.js";


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
server.delete('/actividades/eliminar/:id', eliminarActividad);

// ---------- Configuración del motor de plantillas ----------
server.set('view engine', 'ejs');
server.set('views', join(__dirname, 'views'));


server.listen(3000, () => console.log('Servidor corriendo en el puerto 3000'));