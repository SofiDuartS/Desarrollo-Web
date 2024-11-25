import bcrypt from 'bcrypt';
import { UserModel } from '../models/userModel.js';

export const crearUsuario = async (req, res) => {
    try{
        const data = req.body;
        console.log(data);
        await UserModel.create(data);
        res.redirect('/usuarios');
        console.log("Usuario creado correctamente");
    }
    catch(error){
        console.log(error);
    }
}

export const renderCrearUsuario = (req, res) => {
    try {
        res.render('Usuarios/crearUsuario');
    } catch (error) {
        console.log(error);
    }
}

export const obtenerUsuario = async (req, res) => {
    try {
        const id = req.params.id;
        const userId = await UserModel.findById(id);
        res.render('Usuarios/consultarUsuario', { usuario: userId });
        console.log("Usuario obtenido correctamente"); 
    } catch (error) {
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

export const getUsuarios = async (req, res) => {
    try {
        const data = await UserModel.find();
        res.render('Usuarios/usuarios', { usuarios: data });
    } catch (error) {
        console.log(error);
    }
}

export const iniciarSesion = async (req, res) => {
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
        const { correo, password } = req.body;
        console.log('POST /login');
        console.log('Request body:', req.body); // Debugging statement  

        const user = await UserModel.findOne({ correo, isAdmin: true });
        if (user) {
            console.log('User found:', user); // Debugging statement
            console.log('Plain text password:', password); // Debugging statement
            console.log('Hashed password from DB:', user.password); // Debugging statement

            const isMatch = await bcrypt.compare(password, user.password);
            console.log('Password match:', isMatch); // Debugging statement

            if (isMatch) {
                // Set the session
                req.session.user = { 
                    nombre: user.nombre, 
                    apellido: user.apellido, 
                    correo: user.correo, 
                    isAdmin: user.isAdmin 
                };
                res.redirect('/usuarios');
            } else {
                res.render('Usuarios/iniciarSesion', { error: true });
            }
        } else {
            res.render('Usuarios/iniciarSesion', { error: true });
        }
    } catch (error) {   
        console.log(error);
    }
}

export const logout = async (req, res) => {
    try {
        req.session.destroy();
        res.redirect('/');
    } catch (error) {
        console.log(error);
    }
}