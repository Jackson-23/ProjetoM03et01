import express from 'express';
import cors from 'cors';
import { routers } from './src/routers/ramens.router.js';
import { connectToDatabase } from './src/database/database.js'
//import path from 'path'

const app = express();
const PORT = process.env.PORT || 3000;
//let __dirname = path.resolve(path.dirname(''))
connectToDatabase();

//app.use(express.urlencoded({extendend: true}));
app.use(express.json());
app.use(cors());
app.use('/ramens', routers);
//app.use(express.static(path.join(__dirname, 'public')));
//app.use(express.urlencoded());

//Listen
app.listen(3000, () => {
  console.log('Rodando em: localhost:3000');
});
