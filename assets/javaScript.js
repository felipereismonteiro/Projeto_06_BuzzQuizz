const quizes = document.querySelector(".Quizes");

function allQuizes() { //buscando todos os quizes
    const promise = axios.get('https://mock-api.driven.com.br/api/v4/buzzquizz/quizzes');
    promise.then(chegou)
}
allQuizes()

function chegou(res) {
    quizes.innerHTML = ""
    res.data.forEach(quiz => {
        quizes.innerHTML += 
        `
       <div class="imgQuizes">
            <a href="#">
                <div class="img" data-img="${quiz.id}">
                    <h1>${quiz.title}</h1>
                    <img src="${quiz.image}">
                </div>
            </a>
        </div>
        `
    });
}

function criandoQuiz() {
    document.querySelector(".telaInicial").classList.add("escondido")
    // Escondendo a tela inicial
    document.querySelector(".infos-basicas").classList.remove("escondido")
    document.querySelector(".criar_quiz").classList.remove("escondido")
    // Mostrando a tela de criacao de quizes
    newQuizz = {
        title: "",
        image: "",
        questions: [],
        levels: []
    }
    // Zerando a variável que recebe informações do novo quizz
}

function paginaInicial() {
    window.location.reload() 
    //recarrega a pagina pra mostrar a tela inicial junto do quiz criado
}

// Fim do js de Felipe 

/*pagina de quiz javascript JONAS*/

const quizUrl = 'https://mock-api.driven.com.br/api/v4/buzzquizz/quizzes/'

function quizFull(todos) {
    const quiz = todos.data
    console.log(quiz)
    montarQuiz(quiz)
}

function retornoErro(erro) {
    console.log(erro)
}


function montarQuiz(quizEscolhido) {
    montarTitulo(quizEscolhido)
    montarPerguntas(quizEscolhido.questions)
    montarScore(quizEscolhido)
}


const paginaQuiz = document.querySelector('.pagina_quiz')

function montarTitulo(quizEscolhido) {

    paginaQuiz.innerHTML = `<header class="pagina_quiz-titulo" id="top">
                                <h2>${quizEscolhido.title}</h2>
                            </header>`

    document.querySelector(".pagina_quiz-titulo").style.background = `rgba(0, 0, 0, 0.6) url(${quizEscolhido.image}) top center no-repeat`;
    document.querySelector(".pagina_quiz-titulo").style.backgroundSize = `cover`;
}

const cores = [];
const options = [];
function montarPerguntas(perguntas) {
    perguntas.forEach((pergunta) => {

        paginaQuiz.innerHTML += `<div class="pergunta_quiz atual">
                                <div></div>
                                <div class="pergunta_quiz-titulo">
                                    <h3>${pergunta.title}</h3>
                                </div>
                                <div class="pergunta_quiz-option">
                                    
                                </div>
                            </div>`

        cores.push(pergunta.color)
        options.push(pergunta.answers)

    })

    const titulosPerguntas = document.querySelectorAll(".pergunta_quiz-titulo");
    for (let i = 0; i < cores.length; i++) {

        titulosPerguntas[i].style.backgroundColor = cores[i]
    }


    montarQuests(options);

}


const gabarito = []
function montarQuests(options) {

    const quizQuest = document.querySelectorAll(".pergunta_quiz-option");
    const opt = options;

    for (let i = 0; i < opt.length; i++) {
        opt[i].sort(embaralhar);
        const respostaPergunta = []
        for (let j = 0; j < opt[i].length; j++) {
            quizQuest[i].innerHTML += `<div class="option" onclick="resposta(this)" data-option="${j}">
                                            <img src="${opt[i][j].image}" alt="" >
                                            <span>${opt[i][j].text}</span>
                                         </div>`
            respostaPergunta.push(opt[i][j].isCorrectAnswer)
        }
        gabarito.push(respostaPergunta)
    }
    respostaPergunta = [];

    console.log(gabarito)

}

function embaralhar() {
    return Math.random() - 0.5;

}

const promisse = axios.get(`${quizUrl}2`);
promisse.then(quizFull);
promisse.catch(retornoErro);



/*RESPONDENDO */

function resposta(escolha) {

    const resposta = escolha.parentNode.querySelectorAll('.option');
    
    resposta.forEach((opt) => {
        opt.classList.add('resposta-user-not');
    })
    
    escolha.classList.remove('resposta-user-not'); //opção escolhida
    
    
    
    escolha.parentNode.parentNode.querySelector('div').classList.add("respondido"); //limintando o usuario
    
    const proximo = document.querySelector('.atual'); //proxima pergunta
    proximo.classList.remove('atual');

    respostaCorreta(escolha) //mostra as respotas
    setTimeout(rolagem, 2000) //rolagem automatica

}


function rolagem() {

    const atualElemento = document.querySelector('.atual');
    atualElemento.scrollIntoView();

}


let cont = 0;

function respostaCorreta(resposta) {

    const respostas = resposta.parentNode.querySelectorAll(".option") // todas as opçoes

    respostas.forEach((resp) => {

        const respostaFinal = gabarito[cont][resp.dataset.option]

        if (respostaFinal === true) {
            resp.classList.add('respostas-certa')
        } else {
            resp.classList.add('respostas-errada')
        }

    }) 

    cont++;

    score() //mostra o resultado
}

function score() {

    const qddPerguntas = document.querySelectorAll('.pergunta_quiz-titulo');

    if (cont === qddPerguntas.length) {

        const gabaritoFinal = document.querySelector(".gabarito")
        gabaritoFinal.classList.remove('invisivel')

    }


}

function montarScore(quizScore) {


    console.log(quizScore.levels[0].text)
    const gabaritoScore = document.querySelector('.gabarito-titulo')
    console.log(gabaritoScore)
    gabaritoScore.querySelector('h3').innerHTML = `${quizScore.levels[0].title}`
    document.querySelector('.gabarito-resultado img').src  = `${quizScore.levels[0].image}`
    document.querySelector('.gabarito-resultado span').innerHTML = `${quizScore.levels[0].text}`
}

function reiniciarQuiz() {
    window.location.reload()
}

/*fim* JONAS*/

// Criando quiz - Guilherme

let newQuizz; // Variável para guardar as informações do novo quiz

function verifica_infos_basicas() {
    const inputs = document.querySelectorAll(".infos-basicas input");
    const erros = document.querySelectorAll(".infos-basicas .erro");
    let problemas = false; // Verifica se ainda há erros nos inputs
    
    // Verificação de título
    const titulo = inputs[0].value;
    if(titulo.length<20||titulo.length>65) {
        erros[0].classList.remove("escondido");
        inputs[0].classList.add("vermelho");
        problemas = true;
    } else {
        erros[0].classList.add("escondido");
        inputs[0].classList.remove("vermelho");
    }

    // Verificação de URL válida
    const url = inputs[1].value;
    if(!isValidUrl(url)) {
        erros[1].classList.remove("escondido");
        inputs[1].classList.add("vermelho");
        problemas = true;
    } else {
        erros[1].classList.add("escondido");
        inputs[1].classList.remove("vermelho");
    }
    
    // Verificação de quantidade de perguntas
    const quant_perguntas = Number(inputs[2].value);
    if(!Number.isInteger(quant_perguntas)||quant_perguntas<3) {
        erros[2].classList.remove("escondido");
        inputs[2].classList.add("vermelho");
        problemas = true;
    } else {
        erros[2].classList.add("escondido");
        inputs[2].classList.remove("vermelho");
    }

    // Verificação de quantidade de níveis
    const quant_niveis = Number(inputs[3].value);
    if(!Number.isInteger(quant_niveis)||quant_niveis<2) {
        erros[3].classList.remove("escondido");
        inputs[3].classList.add("vermelho");
        problemas = true;
    } else {
        erros[3].classList.add("escondido");
        inputs[3].classList.remove("vermelho");
    }

    // No caso de todos os inputs válidos, guardar 
    // as informações e pular para a próxima página
    if(!problemas) {
        newQuizz.title = titulo;
        newQuizz.image = url;
        criandoPerguntas(quant_perguntas,quant_niveis);
    }
}

// Função em construção
function criandoPerguntas(quant_perguntas, quant_niveis) {
    document.querySelector(".infos-basicas").classList.add("escondido");
    document.querySelector(".perguntas").classList.remove("escondido");
}

// Função para verificar se uma URL é valida ou não
// Peguei da Internet. Não sei como funciona.. mas funciona
// (https://www.freecodecamp.org/news/check-if-a-javascript-string-is-a-url/)
const isValidUrl = urlString=> {
    let urlPattern = new RegExp('^(https?:\\/\\/)?'+ // validate protocol
  '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+ // validate domain name
  '((\\d{1,3}\\.){3}\\d{1,3}))'+ // validate OR ip (v4) address
  '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ // validate port and path
  '(\\?[;&a-z\\d%_.~+=-]*)?'+ // validate query string
  '(\\#[-a-z\\d_]*)?$','i'); // validate fragment locator
return !!urlPattern.test(urlString);
}