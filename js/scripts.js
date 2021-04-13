function processarResposta(resposta){
    console.log(resposta.data);
    renderizarFilmes(resposta.data);
}
function processarErroResposta(erro){
    console.log("errou!");
}

function pegarFilmes(){
    const promessa = axios.get("https://mock-api.bootcamp.respondeai.com.br/api/v2/moviefinder/filmes");
    promessa.then(processarResposta);
    promessa.catch(processarErro);
}

function renderizarFilmes(lista){
    const seletorMovies = document.querySelector(".movies");
    seletorMovies.innerHTML = "";

    for(let i =0; i < lista.length; i++){
        seletorMovies.innerHTML += `<div class="movie">
        <img src=${lista[i].imagem}>
        <div class="title">${lista[i].titulo}</div>
        <button onclick="comprar(${lista[i].id})">
          Comprar
          <ion-icon name="cart-outline"></ion-icon>
        </button>
      </div>`;
    }
}

function processarRequisicao(resposta){
    alert("Ingresso comprado com sucesso!");
}
function processarErroRequisicao(erro){
    alert("Os ingressos para esse filme estão esgotados.");
    console.log(erro);
}



function comprar(idFilmeEscolhido){
    console.log(idFilmeEscolhido);
    let nomeCliente = prompt("Qual é o seu nome?");
    let quantidadeAssentos = prompt("Quantos assentos?");

    const requisicao = axios.post(`https://mock-api.bootcamp.respondeai.com.br/api/v2/moviefinder/filmes/${idFilmeEscolhido}/ingresso`,
    { nome: nomeCliente, quantidade: quantidadeAssentos});
    requisicao.then(processarRequisicao);
    requisicao.catch(processarErroRequisicao);
}

pegarFilmes();