import { ActivityModel } from "../models/activityModel.js";

export const crearActividad = async (req, res) => {
    try{
        const data = req.body;
        console.log(data);
        await ActivityModel.create(data);
        const actividades = await ActivityModel.find();
        res.json(actividades);
        res.render('Actividades/consultarActividades', {actividades: actividades, titulo: "Consultar"});
        // res.status(200).json(actividades);
        console.log("Actividad creada correctamente");
    }
    catch(error){
        console.log(error);
        // res.status(400).json({mensaje: error.message, actividades});
    }
}

export const consultarActividades = async (req, res) => {
    try{
        const actividades = await ActivityModel.find();
        res.render('Actividades/consultarActividades', {actividades: actividades, titulo: "Consultar"});
        console.log("Actividades obtenidas correctamente");
    }
    catch(error){
        // res.status(400).json({mensaje: error.message});
        console.log("Error al obtener las actividades");
    }
}

export const consultarActividadesTitulo = async (req, res) => {
    try{
        const titulo = req.params.titulo;
        const actividades = await ActivityModel.find();
        res.render('Actividades/consultarActividades', {actividades: actividades, titulo: titulo});
        console.log("Actividades obtenidas correctamente");
    }
    catch(error){
        // res.status(400).json({mensaje: error.message});
        console.log("Error al obtener las actividades");
    }
}

export const obtenerActividadPorId = async (req, res) => {
    try {
        const id = req.params.id;
        const actividad = await ActivityModel.findById(id);
        // res.status(200).json(actividad);
        res.render('Actividades/consultarActividadParticular', {actividad: actividad});
        console.log("Actividad obtenida correctamente");
        
    } catch (error) {
        // res.status(400).json({mensaje: error.message});
        console.log("Error al obtener la actividad");
    }
}

export const actualizarActividad = async (req, res) => {
    try {
        const dataUpdated = req.body;
        await ActivityModel.updateOne({_id: req.body.idActividad}, {
            nombre: dataUpdated.nombre, 
            grupo: dataUpdated.grupo, 
            fecha: dataUpdated.fecha, 
            ubicacion: dataUpdated.ubicacion,
            resultado: dataUpdated.resultado,
            imagen: dataUpdated.imagen
        });
        const actividad = await ActivityModel.findById(req.body.idActividad);
        res.render('Actividades/consultarActividadParticular', {actividad: actividad});
        // res.status(200).json(actividades);
        console.log("Actividad actualizada correctamente");

    } catch (error) {
        // res.status(400).json({mensaje: error.message});
        console.log("Error al actualizar la actividad");
    }
}

// Cambiando eliminar por inhabilitar
export const inhabilitarActividad = async (req, res) => {
    try{
        await ActivityModel.updateOne({_id: req.params.id}, {estado: false});
        const actividades = await ActivityModel.find();
        res.render('Actividades/consultarActividades', {actividades: actividades, titulo: "Consultar"});
        console.log("Actividad inhabilitada correctamente");
    } catch(error){
        // res.status(400).json({mensaje: error.message});
        console.log("Error al inhabilitar la actividad");
    }
}

// Creando función habilitar para deshacer la inhabilitación
export const habilitarActividad = async (req, res) => {
    try{
        await ActivityModel.updateOne({_id: req.params.id}, {estado: true});
        const actividades = await ActivityModel.find();
        res.render('Actividades/consultarActividades', {actividades: actividades, titulo: "Consultar"});
        console.log("Actividad habilitada correctamente");
    } catch(error){
        // res.status(400).json({mensaje: error.message});
        console.log("Error al habilitar la actividad");
    }
}

export const formularioRegistroActividad = (req, res) => {
    res.render('Actividades/crearActividad');
}

export const formularioActualizarActividad = async (req, res) => {
    try {
        const id = req.params.id;
        const actividad = await ActivityModel.findById(id);
        res.render('Actividades/editarActividad', {actividad: actividad});
    } catch (error) {
        // res.status(400).json({mensaje: error.message});
        console.log(error);
    }
}