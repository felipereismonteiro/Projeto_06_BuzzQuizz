const quizes = document.querySelector(".Quizes");
function allQuizes() { //buscando todos os quizes
    const promise = axios.get('https://mock-api.driven.com.br/api/v4/buzzquizz/quizzes');
    promise.then(chegou)
}
allQuizes()

function chegou(res) {

    setTimeout(loading, 800, 'telaInicial')

    let ids = JSON.parse(localStorage.getItem("IDs"))

    if(ids === null){
        document.querySelector(".criarQuizz").classList.remove("escondido")
        document.querySelector(".seusQuizzes").classList.add("escondido")      
    }

    quizes.innerHTML = ""
    res.data.forEach(quiz => {
        const seusQuizes = document.querySelector(".seusQuizesImage")
        if (ids !== null) {
            ids.forEach((id) => {
                if (quiz.id == id) {
                    seusQuizes.innerHTML +=
                        `
                    <div class="imgQuizes">
                        <a href="#">
                            <div class="img" onclick="buscarQuiz(${quiz.id},'telaInicial');" data-img="${quiz.id}">
                                <h1>${quiz.title}</h1>
                                <img src="${quiz.image}">
                            </div>
                        </a>
                    </div>
                    `
                    return false
                }  
            }) // mostrando seus quizes
        }
    
        if (ids !== null) {
            return false
        }
                
            quizes.innerHTML +=
                `
           <div class="imgQuizes">
                <a href="#">
                    <div class="img" onclick="buscarQuiz(${quiz.id},'telaInicial' );" data-img="${quiz.id}">
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

   // console.log('eia')
    //loading(pagina);
    setTimeout(window.location.reload(), 1000)

   // window.location.reload()
    //recarrega a pagina pra mostrar a tela inicial junto do quiz criado
}
