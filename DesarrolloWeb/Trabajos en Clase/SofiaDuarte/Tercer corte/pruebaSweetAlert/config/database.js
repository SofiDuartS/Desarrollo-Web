import {connect} from 'mongoose';

async function connectDB(){
    try {
        const respDB = await connect("mongodb://localhost:27017/express_sweetalert"); // yourDB es el nombre de la base de datos
        return respDB;
    } catch (error) {
        console.log(error);
    }
}

export {connectDB}; // Exportamos la función connectDB para poder usarla en otro archivo