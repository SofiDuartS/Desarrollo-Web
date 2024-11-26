import { UserModel } from "../models/userModel.js";

export const formularioRegistro = async (req, res) => {
    try {
        const usuarios = await UserModel.find();
        res.render('form', {mensajeAlerta: null, tipoAlerta: null, usuarios: usuarios});
    } catch (error) {
        console.log(error);
    }
}

export const crearUsuario = async (req, res) => {
    try {
        const data = req.body;
        // throw new Error('Error)'); // Simulamos un error
        await UserModel.create(data);
        const usuarios = await UserModel.find();
        res.render('form', {mensajeAlerta: 'Usuario creado correctamente', tipoAlerta: 'success', usuarios: usuarios});
    } catch (error) {
        console.log(error);
        const usuarios = await UserModel.find();
        res.render('form', {mensajeAlerta: 'Ups! Algo salió mal', tipoAlerta: 'error', usuarios: usuarios});
    }
}

export const formularioActualizar = async (req, res) => {
    try {
        const id = req.params.id;
        const usuario = await UserModel.findOne({_id: id});
        res.render('formUpdate', {usuario: usuario});
        
    } catch (error) {
        console.log(error);
    }
}

export const actualizarUsuario = async (req, res) => {
    try {
        const dataUpdated = req.body;
        await UserModel.updateOne({_id: req.body.idUsuario}, {name: dataUpdated.name, lastname: dataUpdated.lastname, email: dataUpdated.email, role: dataUpdated.role});
        const usuarios = await UserModel.find();
        res.render('form', {mensajeAlerta: `Usuario ${dataUpdated.name} ${dataUpdated.lastname} ha sido actualizado correctamente`, tipoAlerta: 'success', usuarios: usuarios});
    } catch (error) {
        console.log(error);
    }
}