import {connect} from 'mongoose';

async function connectDB(){
    try {
        const respDB = await connect("mongodb://localhost:27017/sweetalert");
        return respDB;
    } catch (error) {
        console.log(error);
    }
}

export {connectDB}; 