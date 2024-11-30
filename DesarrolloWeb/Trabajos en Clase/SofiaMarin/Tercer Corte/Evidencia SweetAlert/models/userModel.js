import { Schema, model} from "mongoose";

const userSchema = new Schema({
    name: {type: String},
    lastname: {type: String},
    email: {type: String},
    role: {type: String}
})

const UserModel = model('users', userSchema);

export {UserModel};