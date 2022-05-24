import {
  findAllRamensService,
  findRamensByIdService,
  createRamenfunction,
  updateRamenfunction,
  deleteRamenfunction
} from '../services/ramens.service.js';

export const GetfindAllRamens = async (req, res) => {
  const ramens = findAllRamensService();
  res.send(ramens);
};

export const GetfindRamensById = async (req, res) => {
  const parametroNumber = Number(req.params.id);
  const ramens = findRamensByIdService(parametroNumber);
  res.send(ramens);
};

export const createRamen = async (req, res) => {
  const ramen = req.body;
  const newRamen = createRamenfunction(ramen);
  res.send(newRamen);
};

export const updateRamen = async (req, res) => {
  const idParam = +req.params.id;
  const ramenEdit = req.body;
  const updatedRamen = updateRamenfunction(idParam, ramenEdit);
  res.send(updatedRamen);
};

export const deleteRamen = async (req, res) => {
  const idParam = req.params.id;
  deleteRamenfunction(idParam);
  res.send({ message: 'Ramen deletado com sucesso!' });
};
