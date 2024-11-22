import { UserModel } from "../models/userModel.js";

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