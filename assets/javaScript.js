const quizes = document.querySelector(".Quizes");

function allQuizes() { //buscando todos os quizes
    const promise = axios.get('https://mock-api.driven.com.br/api/v4/buzzquizz/quizzes');
    promise.then(chegou)
}
allQuizes()

function chegou(res) {
    quizes.innerHTML = ""
    res.data.forEach(element => {
        quizes.innerHTML += 
        `
       <div class="imgQuizes">
            <a href="#">
                <div class="img" >
                    <h1>${element.title}</h1>
                    <img src="${element.image}">
                </div>
            </a>
        </div>
        `
    });
}