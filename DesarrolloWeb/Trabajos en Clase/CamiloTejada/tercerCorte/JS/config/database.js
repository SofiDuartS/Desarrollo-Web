import { connect } from 'mongoose';
// import { config } from 'dotenv';



async function connectDB() {
    try {
        const responseDB = await connect("mongodb://localhost:27017/webdev")
        console.log('MongoDB connected');
        return responseDB;
    } catch (error) {
        console.error('error');
    }
}

export { connectDB };