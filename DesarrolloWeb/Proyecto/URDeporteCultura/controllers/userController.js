import { UserModel } from '../models/userModel.js';

export const crearUsuario = async (req, res) => {
    try{
        const data = req.body;
        console.log(data);
        await UserModel.create(data);
        const usuarios = await UserModel.find();
        res.render('Usuarios/usuarios', {usuarios: usuarios, titulo: "Consultar"});
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
        const { idUsuario, nombre, apellido, correo, ids, estado } = req.body;
        console.log('Request body:', req.body); // Debugging statement

        // Check if the user exists before updating
        const userExists = await UserModel.findById(idUsuario);
        if (!userExists) {
            console.log('User not found');
            return res.status(404).json({ mensaje: 'User not found' });
        }

        // Build the update object conditionally
        const updateData = {
            ...(nombre && { nombre }),
            ...(apellido && { apellido }),
            ...(correo && { correo }),
            ...(ids && { ids }),
            ...(estado !== undefined && { estado }) // Conditionally include estado
        };

        const updateResult = await UserModel.updateOne(
            { _id: idUsuario },
            { $set: updateData }
        );

        console.log('Update result:', updateResult); // Debugging statement

        if (updateResult.acknowledged === false) {
            console.log('Update not acknowledged');
            return res.status(500).json({ mensaje: 'Update not acknowledged' });
        }

        if (updateResult.nModified === 0) {
            console.log('No documents were updated');
        }

        console.log('Usuario modificado correctamente');
        res.redirect('/usuarios'); // Redirect to the desired page after successful update
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

export const consultarUsuarios = async (req, res) => {
    try{
        const data = await UserModel.find();
        //console.log(data);
        res.render('Usuarios/listaUsuarios', { usuarios: data });
        console.log("Usuarios obtenidos correctamente");
    }
    catch(error){
        // res.status(400).json({mensaje: error.message});
        console.log("Error al obtener usuarios");
    }
}


export const vUsuarios = async (req, res) => {
    try {
        const usuarios = await UserModel.find();
       //console.log(usuarios);
        res.render('Usuarios/usuarios', {usuarios: usuarios, titulo: "Consultar"});
    } catch (error) {
        console.log(error);
    }
}

export const iniciarSesion = async (req, res) => {
    console.log('GET /');
    try {
        res.render('Usuarios/iniciarSesion');
    } catch (error) {
        console.log(error);
    }
}

export const recuperarCuenta = async (req, res) => {
    try {
        res.render('Usuarios/recuperarCuenta');
    } catch (error) {
        console.log(error);
    }
}

export const login = async (req, res) => {
    try {
        const { username, password } = req.body;
        console.log('POST /login');
        console.log('Request body:', req.body); // Debugging statement  

        // Simulate authentication (replace with your logic)
        if (username === 'admin' && password === 'admin') {
            res.redirect('/usuarios');
        } else {
            res.render('Usuarios/iniciarSesion', { error: true });
        }
    } catch (error) {   
        console.log(error);
    }
}