import { groupModel } from "../models/groupModel.js";
import { UserModel } from "../models/userModel.js";

export const crearGrupo = async (req, res) => {
    try {

        console.log(req.body)
        const { nombre, categoria, diaspractica, ubicacion, integrantes } = req.body;

        // Asegurarse de que `integrantes` es un arreglo de ObjectIds
        const integrantesIds = Array.isArray(integrantes) ? integrantes : [integrantes];

        // Crear el grupo con los datos enviados
        const nuevoGrupo = await groupModel.create({
            nombre: nombre,
            categoria: categoria,
            diaspractica: diaspractica,
            ubicacion: ubicacion,
            integrantes: integrantesIds,
        });

        console.log("Grupo creado correctamente:", nuevoGrupo);

        // Recuperar todos los grupos para la vista
        const grupos = await groupModel.find().populate('integrantes');
        
        res.render('Grupos/consultarGruposGen', { grupos, titulo: "Consultar" });
    } catch (error) {
        console.error("Error al crear el grupo:", error.message);
        res.status(400).json({ mensaje: error.message });
    }
};

export const consultarGrupos = async (req, res) => {
    try{
        const grupos = await groupModel.find();
        res.render('Grupos/consultarGruposGen', {grupos: grupos, titulo: "Consultar"});
        console.log("Grupo obtenido correctamente");
    }
    catch(error){
        // res.status(400).json({mensaje: error.message});
        console.log("Error al obtener el grupo");
    }
}

export const consultarGruposTitulo = async (req, res) => {
    try{
        const titulo = req.params.titulo;
        const grupos = await groupModel.find();
        res.render('Grupos/consultarGruposGen', {grupos: grupos, titulo: titulo});
        console.log("Grupos obtenidos correctamente");
    }
    catch(error){
        // res.status(400).json({mensaje: error.message});
        console.log("Error al obtener los grupos");
    }
}

export const obtenerGrupoPorId = async (req, res) => {
    try {
        const id = req.params.id;
        const grupo = await groupModel.findById(id).populate({path: 'integrantes', select: 'nombre'});
        // res.status(200).json(grupo);
        res.render('Grupos/consultarGrupoEsp', {grupo: grupo});
        console.log("Grupo obtenido correctamente");
        
    } catch (error) {
        // res.status(400).json({mensaje: error.message});
        console.log("Error al obtener el grupo");
    }
}

export const actualizarGrupo = async (req, res) => {
    try {
        const idGrupo = req.body.idGrupo;
        const nombre = req.body.nombre;
        const diaspractica = req.body.diaspractica;
        const ubicacion = req.body.ubicacion;
        const integrantes = req.body.integrantes;
        const categoria = req.body.categoria;


        // Asegurarse de que `integrantes` sea un arreglo, incluso si es un solo ID
        const integrantesIds = Array.isArray(integrantes) ? integrantes : [integrantes];

        // Actualizar el grupo con los datos enviados
        const grupoActualizado = await groupModel.findByIdAndUpdate(
            idGrupo,
            {
                nombre: nombre,
                categoria: categoria,
                diaspractica: diaspractica,
                ubicacion: ubicacion,
                integrantes: integrantesIds, // Actualizamos la lista de integrantes
            },
            { new: true } // Devolver el documento actualizado
        ).populate({
            path: 'integrantes',
            select: 'nombre', // Poblar solo los nombres de los integrantes
        });

        if (!grupoActualizado) {
            return res.status(404).json({ mensaje: "Grupo no encontrado" });
        }

        console.log("Grupo actualizado correctamente:", grupoActualizado);
        res.render('Grupos/consultarGrupoEsp', { grupo: grupoActualizado });
    } catch (error) {
        console.error("Error al actualizar el grupo:", error.message);
        res.status(400).json({ mensaje: error.message });
    }
};


export const inhabilitarGrupo = async (req, res) => {
    try{
        await groupModel.updateOne({_id: req.params.id}, {estado: false});
        const grupos = await groupModel.find();
        res.render('Grupos/consultarGruposGen', {grupos: grupos, titulo: "Consultar"});
        console.log("Grupo inhabilitado correctamente");
    } catch(error){
        // res.status(400).json({mensaje: error.message});
        console.log("Error al inhabilitar el grupo");
    }
}

export const habilitarGrupo = async (req, res) => {
    try{
        await groupModel.updateOne({_id: req.params.id}, {estado: true});
        const grupos = await groupModel.find();
        res.render('Grupos/consultarGruposGen', {grupos: grupos, titulo: "Consultar"});
        console.log("Grupo habilitado correctamente");
    } catch(error){
        // res.status(400).json({mensaje: error.message});
        console.log("Error al habilitar el grupo");
    }
}

export const formularioRegistroGrupo = async (req, res) => {
    try{
        const usuarios = await UserModel.find()
        res.render('Grupos/crearGrupoEsp', {usuarios: usuarios});
    } catch(error){
        res.status(400).json({mensaje: error.message});
    }
}

export const formularioActualizarGrupo = async (req, res) => {
    try {
        const id = req.params.id;
        const grupo = await groupModel.findById(id);
        const usuarios = await UserModel.find();
        res.render('Grupos/editarGrupo', {grupo: grupo, usuarios: usuarios});
    } catch (error) {
        // res.status(400).json({mensaje: error.message});
        console.log(error);
    }
}

export const index = (req, res) => {
    res.render('indexdos');
}

export const integrantes = async (req, res) => {
    const grupo = await groupModel.findById(req.params.id).populate({path: 'integrantes'})
    console.log(grupo)
    res.render('Grupos/consultarIntegrantesGrupo', {grupo: grupo});
}

export const eliminarIntegrante = async (req, res) => {
    try {
        const idGrupo = req.params.idgrupo;
        const idIntegrante = req.params.idintegrante;

        // Encuentra el grupo y actualiza la lista de integrantes
        const grupoActualizado = await groupModel.findByIdAndUpdate(
            idGrupo,
            { $pull: { integrantes: idIntegrante } }, // $pull elimina el integrante del arreglo
            { new: true } // Devuelve el documento actualizado
        ).populate({
            path: 'integrantes',
            select: 'nombre' // Opcional: Poblar los nombres de los integrantes restantes
        });

        if (!grupoActualizado) {
            return res.status(404).json({ mensaje: "Grupo no encontrado" });
        }

        console.log("Integrante eliminado correctamente:", idIntegrante);
        res.render('Grupos/consultarGrupoEsp', { grupo: grupoActualizado });

    } catch (error) {
        console.error("Error al eliminar el integrante:", error.message);
        res.status(400).json({ mensaje: error.message });
    }
};
