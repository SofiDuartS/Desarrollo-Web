import{ UserModel } from '../models/userModel.js';

export const crearUsuario = async (req, res) => {
    try{
        const data = req.body;
        console.log(data);
        await UserModel.create(data);
        const usuarios = await UserModel.find();
        res.render('Usuarios/listaUsuarios', {usuarios: usuarios, titulo: "Consultar"});
        // res.status(200).json(usuarios);
        console.log("Usuario creado correctamente");
    }
    catch(error){
        console.log(error);
        // res.status(400).json({mensaje: error.message, usuarios});
    }
}

export const formularioRegistroUsuario = (req, res) => {
    res.render('Usuarios/crearUsuario');
}

export const obtenerUsuarioPorId = async (req, res) => {
    try {
        const id = req.params.id;
        const usuario = await UserModel.findById(id);
        // res.status(200).json(actividad);
        res.render('Usuarios/consultarUsuarioParticular', {usuario: usuario});
        console.log("Usuario obtenido correctamente");
        
    } catch (error) {
        // res.status(400).json({mensaje: error.message});
        console.log("Error al obtener usuario");
    }
}


export const actualizarUsuario = async (req, res) => {
    try {
        const dataUpdated = req.body;
        console.log('Request body:', dataUpdated); // Debugging statement

        // Check if the user exists before updating
        const userExists = await UserModel.findById(req.body.idUsuario);
        if (!userExists) {
            console.log('User not found');
            return res.status(404).json({ mensaje: 'User not found' });
        }

        const updateResult = await UserModel.updateOne(
            { _id: req.body.idUsuario },
            {
                nombre: dataUpdated.nombre,
                apellido: dataUpdated.apellido,
                fecha: dataUpdated.fecha,
                correo: dataUpdated.correo,
                ids: dataUpdated.ids,
            }
        );

        console.log('Update result:', updateResult); // Debugging statement

        if (updateResult.acknowledged === false) {
            console.log('Update not acknowledged');
            return res.status(500).json({ mensaje: 'Update not acknowledged' });
        }

        if (updateResult.nModified === 0) {
            console.log('No documents were updated');
        }

        const usuario = await UserModel.findById(req.body.idUsuario);
        res.render('Usuarios/listaUsuarios', { usuario: usuario });
        console.log('Usuario modificado correctamente');
    } catch (error) {
        console.log('Error al modificar usuario:', error.message);
        res.status(400).json({ mensaje: error.message });
    }
};

export const eliminarUsuario = async (req, res) => {
    try {
        await UserModel.deleteOne({_id: req.params.id});
        const usuarios = await UserModel.find();
        res.render('Usuarios/listaUsuarios', {usuarios: usuarios, titulo: "Consultar"});
        // res.status(200).json(actividades);
        console.log("Usuario eliminado correctamente");
    }
    catch(error){
        // res.status(400).json({mensaje: error.message});
        console.log("Error al eliminar usuario");
    }
}

export const formularioModificarUsuario = async (req, res) => {
    try {
        const id = req.params.id;
        const usuario = await ActivityModel.findById(id);
        res.render('Usuarios/modUsuario', {usuario: usuario});
    } catch (error) {
        // res.status(400).json({mensaje: error.message});
        console.log(error);
    }
}

export const formularioActualizarUsuario = async (req, res) => {
    try {
        const id = req.params.id;
        const usuario = await UserModel.findById(id);
        res.render('Actividades/editarActividad', {usuario: usuario});
    } catch (error) {
        // res.status(400).json({mensaje: error.message});
        console.log(error);
    }
}