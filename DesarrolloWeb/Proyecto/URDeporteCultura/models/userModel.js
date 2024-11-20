import { Schema, model } from "mongoose";

const userSchema = new Schema({
    nombre: { type: String, required: true },
    apellido: { type: String, required: true },
    correo: { type: String, required: true, unique: true },
    id: { type: String, required: true },
    estado: { type: Boolean, default: true }, // habilidado o deshabilitado
    imagen: { type: String } // Agregamos un campo imagen para almacenar la URL de la imagen
    // La imagen se va a subir con multer y se va a guardar en la carpeta uploads
    // La URL guardada en la base de datos va a ser la ubicación de la imagen en el servidor
})

const UserModel = model('usuarios', userSchema);

export { UserModel };



/*
Listar usuarios activos
const activeUsers = await User.find({ isActive: true });
console.log(activeUsers);

Listar usuarios inactivos
const inactiveUsers = await User.find({ isActive: false });
console.log(inactiveUsers);

Desactivar usuario
const userId = "user_id_to_deactivate";
await User.findByIdAndUpdate(userId, { isActive: false });

Activar usuario
const userId = "user_id_to_activate";
await User.findByIdAndUpdate(userId, { isActive: true });

*/