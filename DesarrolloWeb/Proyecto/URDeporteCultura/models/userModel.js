import { Schema, model} from "mongoose";

const userSchema = new Schema({
    nombre: {type: String},
    apellido: {type: String},
    correo: {type: String},
    id: {type: String},
    estado: {type: Boolean}, // habilidado o deshabilitado
    imagen: {type: String} // Agregamos un campo imagen para almacenar la URL de la imagen
    // La imagen se va a subir con multer y se va a guardar en la carpeta uploads
    // La URL guardada en la base de datos va a ser la ubicación de la imagen en el servidor
})

const UserModel = model('usuarios', userSchema);

export { UserModel };