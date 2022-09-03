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
        renderizaPerguntas(quant_perguntas,quant_niveis);
    }
}

// Função em construção
function renderizaPerguntas(quant_perguntas, quant_niveis) {
    document.querySelector(".infos-basicas").classList.add("escondido");
    const blocoPerguntas = document.querySelector(".perguntas");
    blocoPerguntas.classList.remove("escondido");
    blocoPerguntas.innerHTML = `
    <header>Crie suas perguntas</header>
    <main data-identifier="question-form">
        <div class="destaque">
            <span>Pergunta 1<span class="destacarErro escondido">*</span></span>
            <img data-identifier="expand" src="./img/img-pagina-quiz/Vector.png" onclick="expandirInputs(this)" class="escondido">
        </div>
        <div class="telaDeInputs">
            <input type="text" placeholder="Texto da pergunta" />
            <div class="erro escondido">A pergunta deve ter pelo menos 20 caracteres</div>
            <input type="text" placeholder="Cor de fundo da pergunta" />
            <div class="erro escondido">A cor deve seguir um formato hexadecimal</div>

            <div class="destaque">Resposta correta</div>
            <input type="text" placeholder="Resposta correta" />
            <div class="erro escondido">A pergunta deve apresentar uma resposta correta</div>
            <input type="text" placeholder="URL da imagem" />
            <div class="erro escondido">O valor informado não é uma URL válida</div>

            <div class="destaque">Respostas incorretas</div>
            <div class="erro escondido">A pergunta deve apresentar pelo menos uma resposta incorreta</div>
            <input type="text" placeholder="Resposta incorreta 1" />
            <input type="text" placeholder="URL da imagem 1" />
            <div class="erro escondido">O valor informado não é uma URL válida</div>
            <input type="text" placeholder="Resposta incorreta 2" />
            <input type="text" placeholder="URL da imagem 2" />
            <div class="erro escondido">O valor informado não é uma URL válida</div>
            <input type="text" placeholder="Resposta incorreta 3" />
            <input type="text" placeholder="URL da imagem 3" />
            <div class="erro escondido">O valor informado não é uma URL válida</div>
        </div>
    </main>`;    
    
    for(let i=2;i<=quant_perguntas;i++) {
        blocoPerguntas.innerHTML += `
        <main data-identifier="question-form">
        <div class="destaque">
            <span>Pergunta ${i}<span class="destacarErro escondido">*</span></span>
            <img data-identifier="expand" src="./img/img-pagina-quiz/Vector.png" onclick="expandirInputs(this)" class="">
        </div>
        <div class="telaDeInputs escondido">
            <input type="text" placeholder="Texto da pergunta" />
            <div class="erro escondido">A pergunta deve ter pelo menos 20 caracteres</div>
            <input type="text" placeholder="Cor de fundo da pergunta" />
            <div class="erro escondido">A cor deve seguir um formato hexadecimal</div>
            
            <div class="destaque">Resposta correta</div>
            <input type="text" placeholder="Resposta correta" />
            <div class="erro escondido">A pergunta deve apresentar uma resposta correta</div>
            <input type="text" placeholder="URL da imagem" />
            <div class="erro escondido">A pergunta deve apresentar pelo menos uma resposta incorreta</div>

            <div class="destaque">Respostas incorretas</div>
            <div class="erro escondido">A pergunta deve apresentar pelo menos uma resposta incorreta</div>
            <input type="text" placeholder="Resposta incorreta 1" />
            <input type="text" placeholder="URL da imagem 1" />
            <div class="erro escondido">O valor informado não é uma URL válida</div>
            <input type="text" placeholder="Resposta incorreta 2" />
            <input type="text" placeholder="URL da imagem 2" />
            <div class="erro escondido">O valor informado não é uma URL válida</div>
            <input type="text" placeholder="Resposta incorreta 3" />
            <input type="text" placeholder="URL da imagem 3" />
            <div class="erro escondido">O valor informado não é uma URL válida</div>
        </div>
        </main>
        `;
    }

    blocoPerguntas.innerHTML += `<button onclick="verifica_perguntas(${quant_niveis})">Prosseguir pra criar níveis</button>`;
}

function expandirInputs(imagem) {
    const blocoMaior = imagem.parentNode.parentNode.parentNode;
    const perguntas = blocoMaior.querySelectorAll("main");
    let perguntaAberta=null;
    for(i=0;i<perguntas.length&&perguntaAberta===null;i++) {
        if(!perguntas[i].querySelector(".telaDeInputs").classList.contains("escondido")) {
            perguntaAberta = perguntas[i];
        }
    }
    perguntaAberta.querySelector(".telaDeInputs").classList.add("escondido");
    perguntaAberta.querySelector("img").classList.remove("escondido");

    const perguntaEscolhida = imagem.parentNode.parentNode;
    perguntaEscolhida.querySelector(".telaDeInputs").classList.remove("escondido");
    perguntaEscolhida.querySelector("img").classList.add("escondido");
}

function verifica_perguntas(quant_niveis) {
    const perguntas = document.querySelectorAll(".perguntas main");
    let problemaGeral = false;
    let questions = [];
    for(let i=0;i<perguntas.length;i++) {
        const inputs = perguntas[i].querySelectorAll("input");
        const erros = perguntas[i].querySelectorAll(".erro");
        let problemaLocal = false;

        if(inputs[0].value.length<20) {
            inputs[0].classList.add("vermelho");
            erros[0].classList.remove("escondido");
            problemaLocal = true;
        } else {
            inputs[0].classList.remove("vermelho");
            erros[0].classList.add("escondido");
        }

        if(!EHexadecimal(inputs[1].value)) {
            inputs[1].classList.add("vermelho");
            erros[1].classList.remove("escondido");
            problemaLocal = true;
        } else {
            inputs[1].classList.remove("vermelho");
            erros[1].classList.add("escondido");
        }

        if(inputs[2].value==="") {
            inputs[2].classList.add("vermelho");
            erros[2].classList.remove("escondido");
            problemaLocal = true;
        } else {
            inputs[2].classList.remove("vermelho");
            erros[2].classList.add("escondido");
        }

        if(!isValidUrl(inputs[3].value)) {
            inputs[3].classList.add("vermelho");
            erros[3].classList.remove("escondido");
            problemaLocal = true;
        } else {
            inputs[3].classList.remove("vermelho");
            erros[3].classList.add("escondido");
        }

        if(inputs[4].value!==""&&!isValidUrl(inputs[5].value)) {
            inputs[5].classList.add("vermelho");
            erros[5].classList.remove("escondido");
            problemaLocal = true;
        } else {
            inputs[5].classList.remove("vermelho");
            erros[5].classList.add("escondido");
        }
        
        if(inputs[6].value!==""&&!isValidUrl(inputs[7].value)) {
            inputs[7].classList.add("vermelho");
            erros[6].classList.remove("escondido");
            problemaLocal = true;
        } else {
            inputs[7].classList.remove("vermelho");
            erros[6].classList.add("escondido");
        }

        if(inputs[8].value!==""&&!isValidUrl(inputs[9].value)) {
            inputs[9].classList.add("vermelho");
            erros[7].classList.remove("escondido");
            problemaLocal = true;
        } else {
            inputs[9].classList.remove("vermelho");
            erros[7].classList.add("escondido");
        }
        
        if(inputs[4].value===""&&inputs[6].value===""&&inputs[8].value==="") {
            inputs[4].classList.add("vermelho");
            inputs[6].classList.add("vermelho");
            inputs[8].classList.add("vermelho");
            erros[4].classList.remove("escondido");
            problemaLocal = true;
        } else{
            inputs[4].classList.remove("vermelho");
            inputs[6].classList.remove("vermelho");
            inputs[8].classList.remove("vermelho");
            erros[4].classList.add("escondido");
        }

        if(problemaLocal) {
            problemaGeral = true;
            perguntas[i].querySelector(".destacarErro").classList.remove("escondido");
        } else {
            perguntas[i].querySelector(".destacarErro").classList.add("escondido");
            const pergunta = {
                title:inputs[0].value, 
                color:inputs[1].value,
                answers:[],
            }
            pergunta.answers.push({
                text:inputs[2].value,
                image:inputs[3].value,
                isCorrectAnswer:true
            });
            for(let i=4;i<=8;i+=2) {
                if(inputs[i].value!=="") {
                    pergunta.answers.push({
                        text:inputs[i].value,
                        image:inputs[i+1].value,
                        isCorrectAnswer:false
                    });
                }
            }
            questions.push(pergunta);
        }
    }

    if(!problemaGeral) {
        newQuizz.questions = questions;
        renderizaNiveis(quant_niveis);
    }
}

function renderizaNiveis(quant_niveis){
    document.querySelector(".perguntas").classList.add("escondido");
    const blocoNiveis = document.querySelector(".niveis");
    blocoNiveis.classList.remove("escondido");
    blocoNiveis.innerHTML = `
            <header>Agora, decida os níveis</header>
            <main data-identifier="level">
                <div class="destaque">
                    <span>Nível 1<span class="destacarErro escondido">*</span></span>
                    <img data-identifier="expand" src="./img/img-pagina-quiz/Vector.png" onclick="expandirInputs(this)" class="escondido">
                </div>

                <div class="telaDeInputs">
                    <input type="text" placeholder="Título do nível" />
                    <div class="erro escondido">O título deve ter pelo menos 10 caracteres</div>
                    <input type="text" placeholder="% de acerto mínima" />
                    <div class="erro escondido">O valor inserido dever ser um inteiro entre 0 e 100</div>
                    <input type="text" placeholder="URL da imagem do nível" />
                    <div class="erro escondido">O valor informado não é uma URL válida</div>
                    <input type="text" placeholder="Descrição do nível" />
                    <div class="erro escondido">A descrição deve ter pelo menos 30 caracteres</div>
                </div>
            </main>`;
    
    for(let i=2;i<=quant_niveis;i++) {
        blocoNiveis.innerHTML += `
            <main data-identifier="level">
                <div class="destaque">
                    <span>Nível ${i}<span class="destacarErro escondido">*</span></span>
                    <img data-identifier="expand" src="./img/img-pagina-quiz/Vector.png" onclick="expandirInputs(this)" class="">
                </div>

                <div class="telaDeInputs escondido">
                    <input type="text" placeholder="Título do nível" />
                    <div class="erro escondido">O título deve ter pelo menos 10 caracteres</div>
                    <input type="text" placeholder="% de acerto mínima" />
                    <div class="erro escondido">O valor inserido dever ser um inteiro entre 0 e 100</div>
                    <input type="text" placeholder="URL da imagem do nível" />
                    <div class="erro escondido">O valor informado não é uma URL válida</div>
                    <input type="text" placeholder="Descrição do nível" />
                    <div class="erro escondido">A descrição deve ter pelo menos 30 caracteres</div>
                </div>
            </main>`;
    }

    blocoNiveis.innerHTML += `
    <div class="erro escondido">Deve haver pelo menos um nível com % de acerto mínima igual a 0%</div>
    <button onclick="verifica_niveis()">Finalizar Quizz</button>`;
    window.scrollTo(0,0);
}

function verifica_niveis() {
    const niveis = document.querySelectorAll(".niveis main");
    let problemaGeral = false;
    let acertosZerados = false;
    let levels = [];

    for(let i=0;i<niveis.length;i++) {
        const inputs = niveis[i].querySelectorAll("input");
        const erros = niveis[i].querySelectorAll(".erro");
        let problemaLocal = false;

        if(inputs[0].value.length<10) {
            inputs[0].classList.add("vermelho");
            erros[0].classList.remove("escondido");
            problemaLocal = true;
        } else {
            inputs[0].classList.remove("vermelho");
            erros[0].classList.add("escondido");
        }

        const acerto = Number(inputs[1].value)
        if(!Number.isInteger(acerto)||acerto<0||acerto>100||inputs[1].value==="") {
            inputs[1].classList.add("vermelho");
            erros[1].classList.remove("escondido");
            problemaLocal = true;
        } else {
            inputs[1].classList.remove("vermelho");
            erros[1].classList.add("escondido");
        }
        
        if(!isValidUrl(inputs[2].value)) {
            inputs[2].classList.add("vermelho");
            erros[2].classList.remove("escondido");
            problemaLocal = true;
        } else {
            inputs[2].classList.remove("vermelho");
            erros[2].classList.add("escondido");
        }

        if(inputs[3].value.length<30) {
            inputs[3].classList.add("vermelho");
            erros[3].classList.remove("escondido");
            problemaLocal = true;
        } else {
            inputs[3].classList.remove("vermelho");
            erros[3].classList.add("escondido");
        }
        
        if(problemaLocal) {
            problemaGeral = true;
            niveis[i].querySelector(".destacarErro").classList.remove("escondido");
        } else {
            niveis[i].querySelector(".destacarErro").classList.add("escondido");
            levels.push({
                title:inputs[0].value,
                image:inputs[2].value,
                text:inputs[3].value,
                minValue:acerto
            })
        }
    }

    if(!problemaGeral) {
        acertosZerados = false;
        niveis.forEach((nivel) => {
            const inputs = nivel.querySelectorAll("input");
            const acerto = Number(inputs[1].value);
            if(acerto===0) {
                acertosZerados = true;
            }
        })

        if(!acertosZerados) {
            niveis.forEach((nivel) => {
                const inputs = nivel.querySelectorAll("input");
                inputs[1].classList.add("vermelho");
            })
            const erros = document.querySelectorAll(".niveis .erro");
            erros[erros.length-1].classList.remove("escondido");
            problemaGeral = true;
        } else {
            niveis.forEach((nivel) => {
                const inputs = nivel.querySelectorAll("input");
                inputs[1].classList.remove("vermelho");
            })
            const erros = document.querySelectorAll(".niveis .erro");
            erros[erros.length-1].classList.add("escondido");
        }
    }

    if(!problemaGeral) {
        newQuizz.levels = levels;
        const promise = axios.post("https://mock-api.driven.com.br/api/v4/buzzquizz/quizzes",newQuizz);
        //loading("criar_quiz");
        promise.then(renderizaSucesso);
        promise.catch((erro) => {console.log(erro)});
    }
}

function renderizaSucesso(dados) {
    document.querySelector(".niveis").classList.add("escondido");
    const blocoSucesso = document.querySelector(".sucesso");
    blocoSucesso.classList.remove("escondido");
    blocoSucesso.innerHTML = `
    <header>Seu quizz está pronto!</header>
            <div class="imgQuizes" onclick="recebendoQuiz(dados)">
                <div class="img">
                    <h1>${newQuizz.title}</h1>
                    <img src="${newQuizz.image}" alt="Não foi possível carregar a imagem">
                </div>
            </div>
            <button onclick="buscarQuiz(${dados.data.id})">Acessar Quizz</button>
            <button onclick="paginaInicial()" class="retornar">Voltar para home</button>`;
    //loading("criar_quiz");
    let IDsSerializados = localStorage.getItem("IDs");
    let IDsDeserializados = [];
    if(IDsSerializados!==null) {
        IDsDeserializados = JSON.parse(IDsSerializados);
    }
    IDsDeserializados.push(dados.data.id);
    IDsSerializados = JSON.stringify(IDsDeserializados);
    localStorage.setItem("IDs",IDsSerializados);
}

function EHexadecimal(string) {
    const hexadecimal = '0123456789AaBbCcDdEeFf';
    if(string.length!==7) {
        return false;
    }
    
    if(string[0]!=="#") {
        return false;
    }

    for(let i=1; i<string.length;i++) {
        let satisfazHexa = false;
        for(let j=0;j<hexadecimal.length&&!satisfazHexa;j++) {
            if(string[i]===hexadecimal[j]) {
                satisfazHexa = true;
            }
        }
        if(!satisfazHexa) {
            return satisfazHexa;
        }
    }

    return true;
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

function loading(pagina) {
    document.querySelector("."+pagina).classList.toggle("escondido");
    document.querySelector(".loading").classList.toggle("escondido");
}