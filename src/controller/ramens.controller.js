import {
  findAllRamensService,
  findRamensByIdService,
  createRamenfunction,
  updateRamenfunction,
  deleteRamenfunction
} from '../services/ramens.service.js';
import mongoose from 'mongoose';

//FIND ALL
export const GetfindAllRamens = async (req, res) => {
  const ramens = await findAllRamensService();
  res.send(ramens);
};

//FIND BY ID
export const GetfindRamensById = async (req, res) => {
  const parametroNumber = req.params.id;

  console.log("oi1");
  if(!mongoose.Types.ObjectId.isValid(parametroNumber)){
    console.log("oi2");
    return res.status(400).send({ message: 'ID inválido!' });  
  }
  console.log("oi3");
  const chosenRamen = await findRamensByIdService(parametroNumber);

  if (!chosenRamen) {
    return res.status(404).send({ message: 'Ramen não encontrado!' });
  }
  console.log("oi4");
  res.send(chosenRamen);
};

//CREATE
export const createRamen = async (req, res) => {
  const ramen = req.body;

  if (
    !ramen ||
    !ramen.sabor ||
    !ramen.descricao ||
    !ramen.foto ||
    !ramen.preco
  ) {
    return res.status(400).send({
      message:
        'Você não preencheu todos os dados para adicionar um novo ramen ao cardápio!',
    });
  }

  const newRamen = await createRamenfunction(ramen);
  res.send(newRamen);
};

//UPDATE
export const updateRamen = async (req, res) => {
  const idParam = req.params.id;
  const ramenEdit = req.body;
  console.log("updatecon");
  console.log(idParam);
  if (!mongoose.Types.ObjectId.isValid(idParam)) {
    res.status(400).send({ message: 'ID inválido!' });
    return;
  }


  const chosenRamen = await findRamensByIdService(idParam);

  if (!chosenRamen) {
    return res.status(404).send({ message: 'Ramen não encontrado!' });
  }

  if (
    !ramenEdit ||
    !ramenEdit.sabor ||
    !ramenEdit.descricao ||
    !ramenEdit.foto ||
    !ramenEdit.preco
  ) {
    return res.status(400).send({
      message: 'Você não preencheu todos os dados para editar o ramen!',
    });
  }

  const updatedRamen = updateRamenfunction(idParam, ramenEdit);
  res.send(updatedRamen);


};

//DELETE
export const deleteRamen = async (req, res) => {
  const idParam = req.params.id;

  if (!mongoose.Types.ObjectId.isValid(idParam)) {
    res.status(400).send({ message: 'ID inválido!' });
    return;
  }

  const chosenRamen = await findRamensByIdService(idParam);

  if (!chosenRamen) {
    return res.status(404).send({ message: 'Ramen não encontrado!' });
  }

  await deleteRamenfunction(idParam);
  res.send({ message: 'Ramen deletado com sucesso!' });
};
