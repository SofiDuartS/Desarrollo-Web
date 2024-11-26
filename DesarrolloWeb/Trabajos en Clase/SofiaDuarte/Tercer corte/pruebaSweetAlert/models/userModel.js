import { Schema, model} from "mongoose";

// Acá creamos la estructura de la información a almacenar en la colección user
const userSchema = new Schema({
    name: {type: String},
    lastname: {type: String},
    email: {type: String},
    role: {type: String}
})

const UserModel = model('users', userSchema); // Creamos el modelo User con la estructura userSchema. Con esto ya podemos interactuar con la colección user

export {UserModel};