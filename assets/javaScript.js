 const quizes = document.querySelector(".Quizes");
function allQuizes() { //buscando todos os quizes
    const promise = axios.get('https://mock-api.driven.com.br/api/v4/buzzquizz/quizzes');
    promise.then(chegou)
}
allQuizes()

function chegou(res) {
    let ids = JSON.parse(localStorage.getItem("IDs"))

    if (ids.length === 0) {
        document.querySelector(".criarQuizz").classList.remove("escondido")
        document.querySelector(".seusQuizzes").classList.add("escondido")
    }// se por acaso nao vc nao tiver nenhum quiz


    quizes.innerHTML = ""
    res.data.forEach(quiz => {
        const seusQuizes = document.querySelector(".seusQuizesImage")

        ids.forEach((id) => {
            if (quiz.id == id) {
                seusQuizes.innerHTML +=
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
                return false
            }
        }) // mostrando seus quizes

        for (i = 0; i < ids.length; i++) {
            if (quiz.id === ids[i]) {
                return false    
            }
        }

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
    }); //mostrando todos os quizes
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