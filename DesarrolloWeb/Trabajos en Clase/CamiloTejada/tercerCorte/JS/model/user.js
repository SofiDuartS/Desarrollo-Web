import { model, Schema } from 'mongoose';

const userSchema = new Schema({
    name: String,
    lastname: String,
    email: String,
    role: String
});

const modeloUsuario = model('users', userSchema);

export default modeloUsuario;