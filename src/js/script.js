const loginForm = document.getElementById('loginForm');
const loginSection = document.getElementById('login-section');
const onboardingSection = document.getElementById('onboarding-section');
const cameraSection = document.getElementById('camera-section');

const cameraPreview = document.getElementById('camera-preview');
const feedbackBalao = document.getElementById('feedback-balao');
const feedbackTexto = document.getElementById('feedback-texto');
const btnComparar = document.getElementById('btn-comparar');
const modoAtual = document.getElementById('modo-atual');

const recursosCamera = {
   padrao: "src/assents/foto-sem-recurso.jpg",
   otimizado: "src/assents/fotoexemplo.jpg"
};

loginForm.addEventListener('submit', (e) => {
   e.preventDefault();
   const nome = document.getElementById('username').value;
   const rm = document.getElementById('rm').value;
   if (nome.trim().length < 3) {
       alert("Por favor, insira um nome válido.");
       return;
   }
   if (rm.length < 5) {
       alert("O RM deve ter pelo menos 5 dígitos.");
       return;
   }

   alert(`Bem-vindo, ${nome}! Iniciando configuração do seu Jovi.`);

   loginSection.classList.add('hidden');
   onboardingSection.classList.remove('hidden');
   iniciarOnboarding();
});

function iniciarOnboarding() {
   const frequencia = prompt("Com que frequência você usa a câmera por dia? (Ex: Pouco, Médio, Muito)");

   const botoesOpcao = document.querySelectorAll('.opt-btn');
   botoesOpcao.forEach(botao => {
       botao.addEventListener('click', () => {
           const escolha = botao.getAttribute('data-value');
           alert("Perfil configurado! Vamos para a demonstração prática.");
           onboardingSection.classList.add('hidden');
           cameraSection.classList.remove('hidden');
           configurarModoCamera(escolha);
       });
   });
}

let usandoRecurso = false;
function configurarModoCamera(perfil) {
   if (perfil === 'aula' || perfil === 'doc') {
       modoAtual.innerText = "Modo: Scanner de Documentos";
       exibirFeedback("Detectamos que você é um estudante focado! O modo Scanner ajusta o contraste para textos ficarem nítidos.");
   } else {
       modoAtual.innerText = "Modo: Redes Sociais";
       exibirFeedback("Modo Retrato ativado para suas melhores selfies!");
   }
}

btnComparar.addEventListener('click', () => {
   usandoRecurso = !usandoRecurso;
   if (usandoRecurso) {
       cameraPreview.src = recursosCamera.otimizado;
       btnComparar.innerText = "Ver Sem Recurso";
       exibirFeedback("Viu a diferença? O IA da Jovi remove sombras e nítida as letras automaticamente.");
   } else {
       cameraPreview.src = recursosCamera.padrao;
       btnComparar.innerText = "Ver Com Recurso";
       exibirFeedback("Esta é a foto original sem o processamento educativo da Jovi.");
   }
});

function exibirFeedback(mensagem) {
   feedbackBalao.classList.remove('hidden');
   feedbackTexto.innerText = mensagem;

   setTimeout(() => {
       feedbackBalao.classList.add('hidden');
   }, 5000);
}

document.getElementById('btn-shutter').addEventListener('click', () => {
   alert("Foto salva na sua galeria de estudos!");
});



const interativoSection = document.getElementById('interativo-section');
const quizContainer = document.getElementById('quiz-container');

const perguntasFeedback = [
   {
       pergunta: "O nome dos modos (ex: 'Scanner') ficou mais fácil de entender que os termos técnicos?",
       opcoes: ["Sim, muito mais!", "Prefiro os termos antigos", "Não notei diferença"]
   },
   {
       pergunta: "A comparação 'Antes e Depois' ajudou você a ver o valor do recurso?",
       opcoes: ["Sim, ficou muito claro", "Um pouco", "Não ajudou"]
   }
];
let perguntaAtual = 0;

function renderizarPergunta() {
   quizContainer.innerHTML = "";
   if (perguntaAtual < perguntasFeedback.length) {
       const item = perguntasFeedback[perguntaAtual];
       const div = document.createElement('div');
       div.className = 'pergunta-bloco';
       div.innerHTML = `<h3>${item.pergunta}</h3>`;
       item.opcoes.forEach(opcao => {
           const btn = document.createElement('button');
           btn.className = 'btn-resposta';
           btn.innerText = opacity = opcao;
           btn.onclick = () => {
               perguntaAtual++;
               renderizarPergunta();
           };
           div.appendChild(btn);
       });
       quizContainer.appendChild(div);
   } else {
       mostrarResultadoFinal();
   }
}
function mostrarResultadoFinal() {
   quizContainer.classList.add('hidden');
   const res = document.getElementById('resultado-feedback');
   res.classList.remove('hidden');
   document.getElementById('msg-final').innerText = "Sua opinião ajudará a Jovi a melhorar a câmera para milhares de estudantes!";
}

const btnIrParaFeedback = document.createElement('button');
btnIrParaFeedback.innerText = "Avaliar Experiência";
btnIrParaFeedback.style.marginTop = "10px";
btnIrParaFeedback.style.background = "#ffc107";
btnIrParaFeedback.style.color = "#000";
btnIrParaFeedback.onclick = () => {
   cameraSection.classList.add('hidden');
   interativoSection.classList.remove('hidden');
   renderizarPergunta();
};

document.querySelector('.camera-controls').appendChild(btnIrParaFeedback);


const botoesCard = document.querySelectorAll('.modo-card');
botoesCard.forEach(function(card) {
    card.addEventListener('click', function() {
        const modo = card.getAttribute('data-modo');
        abrirModo(modo);
    });
});


function abrirModo(modo) {
    modoSelecionado = modo;
    const dados = modos[modo];


    
    slideIconeTopo.innerHTML = dados.icone;
    slideTitulo.innerText    = dados.titulo;
    slideDescricao.innerText = dados.descricao;


    infoCardsGrid.innerHTML = "";
    dados.cards.forEach(function(card) {
        const div = document.createElement('div');
        div.className = 'info-card-item';
        div.innerHTML =
            '<span class="card-icon">' + card.icon + '</span>' +
            '<span class="card-label">' + card.label + '</span>' +
            '<span class="card-valor">' + card.valor + '</span>';
        infoCardsGrid.appendChild(div);
    });


    slideDica.innerText = dados.dica;


    
    slideQuando.innerText = dados.quando;


    slideSituacoes.innerHTML = "";
    dados.situacoes.forEach(function(s) {
        const li = document.createElement('li');
        li.innerText = s;
        slideSituacoes.appendChild(li);
    });


    slideAviso.innerText = dados.aviso;


    
    modoAtual.innerText = "Modo: " + dados.titulo;


    
    if (dados.temScanner) {
        slideScanner.style.display = "";
    } else {
        slideScanner.style.display = "none";
    }


    construirDots();
    irParaSlide(0);
    iniciarCamera(videoAntes, 'antes');
    mostrarSecao(cameraSection);
}

btnVoltar.addEventListener('click', function() {
    pararCameras();
    mostrarSecao(modosSection);
    feedbackBalao.classList.add('hidden');
    fotoAntes.classList.add('hidden');
    fotoDepois.classList.add('hidden');
    videoAntes.classList.remove('hidden');
    videoDepois.classList.remove('hidden');
    resultadoScanner.innerText = "O texto detectado aparecera aqui...";
});

function construirDots() {
    dotsContainer.innerHTML = "";
    const slidesVisiveis = document.querySelectorAll('.slide:not([style*="display: none"])');
    slidesVisiveis.forEach(function(slide, i) {
        const dot = document.createElement('span');
        dot.classList.add('dot');
        if (i === 0) dot.classList.add('active');
        dot.addEventListener('click', function() {
            irParaSlide(i);
        });
        dotsContainer.appendChild(dot);
    });
}


function irParaSlide(index) {
    const slidesVisiveis = Array.from(document.querySelectorAll('.slide:not([style*="display: none"])'));
    const dots = document.querySelectorAll('.dot');


    if (index < 0) index = slidesVisiveis.length - 1;
    if (index >= slidesVisiveis.length) index = 0;


    slidesVisiveis.forEach(function(s) { s.classList.remove('active'); });
    dots.forEach(function(d) { d.classList.remove('active'); });


    slidesVisiveis[index].classList.add('active');
    if (dots[index]) dots[index].classList.add('active');


    slideAtual = index;


    const tituloSlide = slidesVisiveis[index].querySelector('h3');
    if (tituloSlide && tituloSlide.innerText.includes('Antes vs Depois')) {
        iniciarCamera(videoAntes, 'antes');
    }


    if (slidesVisiveis[index].id === 'slide-scanner') {
        iniciarCameraScanner();
    }
}


btnNext.addEventListener('click', function() {
    irParaSlide(slideAtual + 1);
});


btnPrev.addEventListener('click', function() {
    irParaSlide(slideAtual - 1);
});

async function iniciarCamera(videoEl, tipo) {
    try {
        const midia = await navigator.mediaDevices.getUserMedia({
            video: { facingMode: "environment" },
            audio: false
        });
        videoEl.srcObject = midia;
        videoEl.play();
        if (tipo === 'antes') streamAntes = midia;
        if (tipo === 'depois') streamDepois = midia;
    } catch (erro) {
        console.error("Erro ao acessar camera:", erro);
        alert("Nao foi possivel acessar a camera. Verifique as permissoes do navegador.");
    }
}


async function iniciarCameraScanner() {
    try {
        const midia = await navigator.mediaDevices.getUserMedia({
            video: { facingMode: "environment" },
            audio: false
        });
        videoScanner.srcObject = midia;
        videoScanner.play();
        streamScanner = midia;
    } catch (erro) {
        console.error("Erro camera scanner:", erro);
        resultadoScanner.innerText = "Erro ao acessar a camera para o scanner.";
    }
}


function pararCameras() {
    if (streamAntes)   { streamAntes.getTracks().forEach(function(t)   { t.stop(); }); streamAntes = null; }
    if (streamDepois)  { streamDepois.getTracks().forEach(function(t)  { t.stop(); }); streamDepois = null; }
    if (streamScanner) { streamScanner.getTracks().forEach(function(t) { t.stop(); }); streamScanner = null; }
}




// TIRAR FOTO


btnFotoAntes.addEventListener('click', function() {
    tirarFoto(videoAntes, canvasAntes, fotoAntes, 'antes');
    setTimeout(function() {
        iniciarCamera(videoDepois, 'depois');
    }, 500);
});


btnFotoDepois.addEventListener('click', function() {
    tirarFoto(videoDepois, canvasDepois, fotoDepois, 'depois');
    const dadosModo = modos[modoSelecionado];
    if (dadosModo) {
        exibirFeedback(dadosModo.feedbackDepois);
    }
});


function tirarFoto(videoEl, canvasEl, imgEl, tipo) {
    const ctx = canvasEl.getContext('2d');
    canvasEl.width  = videoEl.videoWidth;
    canvasEl.height = videoEl.videoHeight;


    if (tipo === 'depois') {
        ctx.filter = obterFiltroModo(modoSelecionado);
    } else {
        ctx.filter = 'none';
    }


    ctx.drawImage(videoEl, 0, 0, canvasEl.width, canvasEl.height);


    const dataURL = canvasEl.toDataURL('image/jpeg');
    imgEl.src = dataURL;
    videoEl.classList.add('hidden');
    imgEl.classList.remove('hidden');


    if (tipo === 'antes' && streamAntes) {
        streamAntes.getTracks().forEach(function(t) { t.stop(); });
    }
    if (tipo === 'depois' && streamDepois) {
        streamDepois.getTracks().forEach(function(t) { t.stop(); });
    }
}


function obterFiltroModo(modo) {
    const filtros = {
        automatico: 'brightness(1.1) contrast(1.05)',
        retrato:    'brightness(1.05) contrast(1.1)',
        paisagem:   'contrast(1.2) saturate(1.3)',
        noturno:    'brightness(1.6) contrast(0.9)',
        comida:     'saturate(1.8) brightness(1.1)',
        macro:      'contrast(1.3) saturate(1.1)',
        acao:       'contrast(1.15) brightness(1.05)',
        estudante:  'grayscale(0.3) contrast(1.4)',
        documento:  'grayscale(1) contrast(1.6)'
    };
    return filtros[modo] || 'none';
}
