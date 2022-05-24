import express from 'express';
import {
  GetfindAllRamens,
  GetfindRamensById,
  createRamen,
  updateRamen,
  deleteRamen,
} from '../controller/ramens.controller.js';

export const routers = express.Router();

//Rotas
//routers.get("/");
routers.get('/find-ramens', GetfindAllRamens);
routers.get('/find-ramens/:id', GetfindRamensById);

routers.post('/create', createRamen);
routers.put('/update/:id', updateRamen);
routers.delete('/delete/:id', deleteRamen);
