//Fake Data Base
const ramens = [
  {
    id: 1,
    sabor: 'Ramen Classic',
    descricao:
      'Quam vulputate dignissim suspendisse in est ante in nibh mauris.',
    foto: 'assets/images/shoyu-ramen.jpg',
    preco: 29.9,
  },
  {
    id: 2,
    sabor: 'Ramen Raiz',
    descricao:
      'Quam vulputate dignissim suspendisse in est ante in nibh mauris.',
    foto: 'assets/images/misso-ramen.jpg',
    preco: 25.0,
  },
  {
    id: 3,
    sabor: 'Ramen Nutella',
    descricao:
      'Quam vulputate dignissim suspendisse in est ante in nibh mauris.',
    foto: 'assets/images/tantanmen.jpg',
    preco: 27.0,
  },
];

//funtions
export const findAllRamensService = () => {
  return ramens;
};

export const findRamensByIdService = (id) => {
  return ramens.find((ramens) => ramens.id == id);
};

export const createRamenfunction = (newRamen) => {
    const newId = ramens.length + 1;
    newRamen.id = newId;
    ramens.push(newRamen);
    return newRamen;
};

export const updateRamenfunction = (id, ramenEdited) => {
    ramenEdited['id'] = id;
    const ramenIndex = ramens.findIndex((ramen) => ramen.id == id);
    ramens[ramenIndex] = ramenEdited;
    return ramenEdited;
};

export const deleteRamenfunction = (id) => {
    const ramenIndex = ramens.findIndex((ramen) => ramen.id == id);
    return ramens.splice(ramenIndex, 1);
};
