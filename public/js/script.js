const baseUrl = "http://localhost:3000/ramens";

async function findAllRamens() {
  const response = await fetch(`${baseUrl}/find-ramens`);

  const ramens = await response.json();

  ramens.forEach((ramens) => {
        document.querySelector("#ramenList").insertAdjacentHTML(
         "beforeend",
          `<div class="RamenListaItem">
          <div>
            <div class="RamenListaItem__sabor">${ramens.sabor}</div>
            <div class="RamenListaItem__preco">R$ ${ramens.preco/*.toFixed(2)*/}</div>
            <div class="RamenListaItem__descricao">${ramens.descricao}</div>
            <button class="Acoes__apagar btn" onclick="abrirModalDelete('${ramens._id}')">Apagar</button>
            <button id="button-form-modal" type="button" class="default-button" onclick="abrirModalCadastro('${ramens._id}')">Alterar</button>
          </div>
            <img class="RamenListaItem__foto" src=${ramens.foto} alt=${`Ramen de ${ramens.sabor}`} />
          </div>`
        );
        console.log(ramens);

    });

};

findAllRamens();



const findRamensById = async () => {
  const id = document.getElementById("idRamen").value;

  const response = await fetch(`${baseUrl}/find-ramens/${id}`);

  const ramen = await response.json();

  const ramenEscolhidaDiv = document.getElementById("ramenEscolhida");

  ramenEscolhidaDiv.innerHTML = `<div class="RamenCardItem">
    <div>
      <div class="RamenCardItem__sabor">${ramen.sabor}</div>
      <div class="RamenCardItem__preco">R$ ${ramen.preco.toFixed(2)}</div>
      <div class="RamenCardItem__descricao">${ramen.descricao}</div>
    </div>
      <img class="RamenCardItem__foto" src=${
        ramen.foto
      } alt=${`Ramen de ${ramen.sabor}`} />
  </div>`;
};

//findRamensById();


//MODAL

async function abrirModalCadastro(id = null) {
  if (id != null) {
    document.querySelector("#title-header-modal").innerText = "Atualizar um Ramen";
    document.querySelector("#button-form-modal").innerText = "Atualizar";

    const response = await fetch(`${baseUrl}/find-ramens/${id}`);
    const ramen = await response.json();

    document.querySelector("#sabor").value = ramen.sabor;
    document.querySelector("#preco").value = ramen.preco;
    document.querySelector("#descricao").value = ramen.descricao;
    document.querySelector("#foto").value = ramen.foto;
    document.querySelector("#id").value = ramen.id;
  } else {
    document.querySelector("#title-header-modal").innerText = "Cadastrar uma Ramen";
    document.querySelector("#button-form-modal").innerText = "Cadastrar";
  }
  document.querySelector(".modal-overlay").style.display = "flex";
}

function fecharModalCadastro() {
  document.querySelector(".modal-overlay").style.display = "none";

  document.querySelector("#id").value = null;
  document.querySelector("#sabor").value = "";
  document.querySelector("#preco").value = 0;
  document.querySelector("#descricao").value = "";
  document.querySelector("#foto").value = "";
}

//CREATE

async function createRamen() {
  const id = document.querySelector("#id").value;
  const sabor = document.querySelector("#sabor").value;
  const preco = document.querySelector("#preco").value;
  const descricao = document.querySelector("#descricao").value;
  const foto = document.querySelector("#foto").value;

  const ramen = {
    id,
    sabor,
    preco,
    descricao,
    foto,
  };


  const modoEdicaoAtivado = id > 0;

  const endpoint = baseUrl + (modoEdicaoAtivado ? `/update/${id}` : '/create');

  const response = await fetch(endpoint, {
    method: modoEdicaoAtivado ? "put" : "post",
    headers: {
      "Content-Type": "application/json",
    },
    mode: "cors",
    body: JSON.stringify(ramen),
  });

  const novoRamen = await response.json();



  const html = `<div class="RamenListaItem">
    <div>
      <div class="RamenListaItem__sabor">${novoRamen.sabor}</div>
      <div class="RamenListaItem__preco">R$ ${novoRamen.preco}</div>
      <div class="RamenListaItem__descricao">${novoRamen.descricao}</div>
      <button class="Acoes__apagar btn" onclick="abrirModalDelete('${novoRamen._id}')">Apagar</button>
      <button id="button-form-modal" type="button" class="default-button" onclick="abrirModalCadastro('${novoRamen._id}')">Alterar</button>

    </div>
      <img class="RamenListaItem__foto" src=${
        novoRamen.foto
      } alt=${`Ramen de ${novoRamen.sabor}`} />
    </div>`;

    if (modoEdicaoAtivado) {
      document.getElementById(`RamenListaItem__${id}`)/*.outerHTML = html*/;
      document.getElementById("ramenList").innerHTML = "";
      findAllRamens();
    } else {
      document.getElementById("ramenList").insertAdjacentHTML("beforeend", html);
    }

    fecharModalCadastro();
};

//createRamen();









//DELETE

function abrirModalDelete(id) {
  document.querySelector("#overlay-delete").style.display = "flex";

  const btnSim = document.querySelector(".btn_delete_yes")

  btnSim.addEventListener("click", function() {
    deleteRamen(id);
  })
}

function fecharModalDelete() {
  document.querySelector("#overlay-delete").style.display = "none";
}

const deleteRamen = async (id) => {
  const response = await fetch(`${baseUrl}/delete/${id}`, {
    method: "delete",
    headers: {
      "Content-Type": "application/json",
    },
    mode: "cors",
  });
  const result = await response.json();
  document.getElementById("ramenList").innerHTML = ""
  findAllRamens();
  fecharModalDelete();
};
