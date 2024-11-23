import  express, { json } from 'express';
import { connectDB } from './config/database.js';
import modeloUsuario from './model/user.js';



const server = express();
connectDB().then();

server.use("view engine", "ejs");
server.get('/usuarios',  async (req, res) => { // request, response
    let usuarios = await modeloUsuario.find();
    res.status(200).json(usuarios);
});

server.listen(3000, () => console.log('Server is running on http://localhost:3000'));