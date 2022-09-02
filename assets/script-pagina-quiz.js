//f2
function chamarTela() {

    const homeTela = document.querySelector('.telaInicial');
    homeTela.classList.add('escondido');

    const quizTela = document.querySelector('.paginaquiz');
    quizTela.classList.remove('escondido');
}


const quizUrl = 'https://mock-api.driven.com.br/api/v4/buzzquizz/quizzes/';

//f1
function buscarQuiz(id) {

    chamarTela()

    const promisse = axios.get(`${quizUrl}${id}`);

    promisse.then(recebendoQuiz);
    promisse.catch(retornoErro);
}

/*pagina de quiz javascript JONAS*/

let quiz;

//f3
function recebendoQuiz(quizCompleto) {

    quiz = quizCompleto.data
    montarQuiz(quiz)

}

function retornoErro(erro) {
    console.log(erro)
}

//f4
function montarQuiz(quizEscolhido) {

    // montarTitulo(quizEscolhido)


    paginaQuiz.innerHTML = `<header class="pagina_quiz-titulo" id="top">
                                    <h2>${quizEscolhido.title}</h2>
                                </header>`

    document.querySelector(".pagina_quiz-titulo").style.background = `rgba(0, 0, 0, 0.6) url(${quizEscolhido.image}) top center no-repeat`;
    document.querySelector(".pagina_quiz-titulo").style.backgroundSize = `cover`;

    // montarPerguntas(quizEscolhido.questions)

    const perguntas = quizEscolhido.questions
    perguntas.forEach((pergunta) => {

        paginaQuiz.innerHTML += `<div class="atual divmarge"></div>
                            <div class="pergunta_quiz ">
                                <div></div>
                                <div class="pergunta_quiz-titulo">
                                    <h3>${pergunta.title}</h3>
                                </div>
                                <div class="pergunta_quiz-option ">
                                    
                                </div>
                            </div>`

        cores.push(pergunta.color)
        options.push(pergunta.answers)

    })

    const titulosPerguntas = document.querySelectorAll(".pergunta_quiz-titulo");
    for (let i = 0; i < cores.length; i++) {

        titulosPerguntas[i].style.backgroundColor = cores[i];

    }

    montarQuests(options);

}


const paginaQuiz = document.querySelector('.pagina_quiz')

/*
function montarTitulo(quizEscolhido) {

    paginaQuiz.innerHTML = `<header class="pagina_quiz-titulo" id="top">
                                <h2>${quizEscolhido.title}</h2>
                            </header>`

    document.querySelector(".pagina_quiz-titulo").style.background = `rgba(0, 0, 0, 0.6) url(${quizEscolhido.image}) top center no-repeat`;
    document.querySelector(".pagina_quiz-titulo").style.backgroundSize = `cover`;
}
*/

let cores = [];
let options = []; //variavel que monta as opções

/*
function montarPerguntas(perguntas) {
    perguntas.forEach((pergunta) => {

        paginaQuiz.innerHTML += `<div class="atual divmarge"></div>
                                <div class="pergunta_quiz ">
                                    <div></div>
                                    <div class="pergunta_quiz-titulo">
                                        <h3>${pergunta.title}</h3>
                                    </div>
                                    <div class="pergunta_quiz-option ">
                                        
                                    </div>
                                </div>`

        cores.push(pergunta.color)
        options.push(pergunta.answers)

    })

    const titulosPerguntas = document.querySelectorAll(".pergunta_quiz-titulo");
    for (let i = 0; i < cores.length; i++) {

        titulosPerguntas[i].style.backgroundColor = cores[i];

    }


    montarQuests(options);

}*/


let gabarito = []

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
                                         </div>` //montando as options
            respostaPergunta.push(opt[i][j].isCorrectAnswer)
        }
        gabarito.push(respostaPergunta)
    }

    respostaPergunta = [];

    setTimeout(rolagemTela, 1000)

}

function embaralhar() {
    return Math.random() - 0.5;

}




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
    setTimeout(rolagemTela, 2000) //rolagem automatica

}


function rolagemTela() {///rolara a tela

    const atualElemento = document.querySelector('.atual');
    atualElemento.scrollIntoView();

} ///


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

    if (gabarito[cont][resposta.dataset.option] === true) {
        scoreFinal++
    }

    cont++;

    score() //mostra o resultado
}

function score() {

    const qddPerguntas = document.querySelectorAll('.pergunta_quiz-titulo');

    if (cont === qddPerguntas.length) {
        montarScore(quiz)
        const gabaritoFinal = document.querySelector(".gabarito")
        gabaritoFinal.classList.remove('invisivel')

    }


}

let scoreFinal = 0;
let nf = 0;

function montarScore(quizScore) {
    const qtdPerguntas = quizScore.questions.length;
    let acertos = Math.floor((scoreFinal / qtdPerguntas) * 100);

    console.log(acertos)

    if (acertos > 60) {
        nf++;
    }

    const gabaritoScore = document.querySelector('.gabarito-titulo')
    gabaritoScore.querySelector('h3').innerHTML = `${acertos}% de acerto: ${quizScore.levels[nf].title}`
    document.querySelector('.gabarito-resultado img').src = `${quizScore.levels[nf].image}`
    document.querySelector('.gabarito-resultado span').innerHTML = `${quizScore.levels[nf].text}`
}

/*REINICIA QUIZ*/
function reiniciarQuiz() {
    //reset()
    console.log('entrei')

    document.querySelectorAll('.divmarge').forEach((div) => {
        div.classList.toggle('atual')
    });

    document.querySelectorAll('.respondido').forEach((op) => {
        op.classList.toggle('respondido');
    });

    document.querySelectorAll('.resposta-user-not').forEach((res) => {
        res.classList.toggle('resposta-user-not');
    });

    document.querySelectorAll('.respostas-errada').forEach((resp) => {
        resp.classList.toggle('respostas-errada');
    });

    document.querySelectorAll('.respostas-certa').forEach((resp) => {
        resp.classList.toggle('respostas-certa');
    });

    document.querySelector('.gabarito').classList.toggle('invisivel');

    cont = 0;
    nf = 0;
    scoreFinal = 0;
    rolagemTela();
    console.log('saindo');
}

/*VOLTAR AO HOMER */

function voltarHome() {
    window.location.reload()
/*
    const botVoltar = document.querySelector('.paginaquiz') //pegando minha tela
    const home = document.querySelector('.telaInicial') //pegando a tela home

    botVoltar.classList.toggle('escondido')  //escondendo minha tela
    home.classList.toggle('escondido') //mostra home
*/


}

/*fim* JONAS*/
