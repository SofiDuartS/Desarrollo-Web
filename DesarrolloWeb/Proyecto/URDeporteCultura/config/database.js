import {connect} from 'mongoose';

async function connectDB(){
    try {
        const respDB = await connect("mongodb://localhost:27017/ur_deporte_cultura"); // ur_deporte_cultura es el nombre de la base de datos
        return respDB;
    } catch (error) {
        console.log(error);
    }
}

export {connectDB};