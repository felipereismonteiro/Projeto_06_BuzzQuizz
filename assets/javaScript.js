const quizes = document.querySelector(".Quizes");
function allQuizes() { //buscando todos os quizes
    const promise = axios.get('https://mock-api.driven.com.br/api/v4/buzzquizz/quizzes');
    promise.then(chegou)
}
allQuizes()

function chegou(res) {
    console.log(res.data)
    quizes.innerHTML = ""
    res.data.forEach(quiz => {
        quizes.innerHTML += 
        `
       <div class="imgQuizes">
            <a href="#">
                <div class="img" onclick="buscarQuiz(${quiz.id});" data-img="${quiz.id}">
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