let pageHeight = 0;

// Obter a altura da página
pageHeight = Math.max(document.body.scrollHeight, document.body.offsetHeight);

// Injetar o iframe na página
const iframe = document.createElement('iframe');
iframe.src = chrome.runtime.getURL('iframe.html');
iframe.style.display = 'none';
iframe.allow = 'microphone; camera';
document.body.appendChild(iframe);
// Inicializar variáveis de mouse e teclado
let mouse = { id: "", class: "", x: 0, y: 0 };
let keyboard = { id: "", class: "", x: 0, y: 0, Typed: "" };

// Template do dicionário de interações
let dataDict = { type: [], time: [], class: [], id: [], x: [], y: [], value: [], scroll: [] };

// Variáveis de tempo
clocker = 0;
let eyeInterval;
let faceInterval;
let sendInterval;
let freezeInterval;
let clockInterval;
let contentInterval;

// Função para obter coordenadas da tela
function getScreenCoordinates(obj) {
    let posX = 0, posY = 0;
    while (obj) {
        posX += obj.offsetLeft;
        posY += obj.offsetTop;
        obj = obj.offsetParent;
    }
    return { x: posX, y: posY };
}

// Função para adicionar evento de interações
function storeInter(interDict) {
    interDict.time = clocker;
    interDict.scroll = Math.round(document.documentElement.scrollTop);
    Object.keys(interDict).forEach(key => dataDict[key].push(interDict[key]));
}

// Configurar ouvintes de mouse
function setupMouseListeners() {
    document.addEventListener('mousemove', storeMouseData);
    document.addEventListener('click', storeMouseData);
    document.addEventListener('wheel', storeMouseData);
}
// Configurar ouvintes de teclado
function setupKeyboardListeners() {
    document.addEventListener('keydown', handleKeyDown);
}

function storeMouseData(e) {
    clearTimeout(freezeInterval);
    freezeInterval = setTimeout(storeInter, 10000, { type: 'freeze', x: mouse.x, y: mouse.y, id: mouse.id, class: mouse.class, value: null });
    mouse.id = e.target.id;
    mouse.class = e.target.className;
    mouse.x = e.pageX;
    mouse.y = e.pageY;
    storeInter({
        type: e.type,
        x: mouse.x,
        y: mouse.y,
        id: mouse.id,
        class: mouse.class,
        value: null
    });
}

function handleKeyDown(e) {
    if (e.key.length === 1) keyboard.typed += e.key;
    if (e.key === 'Enter' || e.key === 'Backspace') {
        storeInter({
            type: 'keyboard',
            x: mouse.x,
            y: mouse.y,
            id: keyboard.id,
            class: keyboard.class,
            value: { key: keyboard.typed }
        });
        keyboard.typed = '';
    }
}

// Configurar ouvintes de WebGazer
function setupWebGazerVideo() {
    let video = document.getElementById('webgazerVideoFeed');
    if (!video) {
        video = document.createElement('video');
        video.id = 'webgazerVideoFeed';
        document.body.appendChild(video);
    }

    Object.assign(video.style, {
        display: 'none',
        position: 'absolute',
        top: '0px',  // Defina conforme necessário
        left: '0px', // Defina conforme necessário
        width: '320px', // Defina conforme necessário
        height: '240px' // Defina conforme necessário
    });

    // Configure webgazer aqui, se necessário
    if (typeof webgazer !== 'undefined') {
        webgazer.setGazeListener(function (data, elapsedTime) {
            if (data) {
                storeInter({
                    type: 'eye',
                    x: Math.round(data.x),
                    y: Math.round(data.y),
                    class: mouse.class,
                    id: mouse.id,
                    value: null
                });
            }
        }).begin();
    }
}

// Configurar ouvintes de microfone
function setupMicrophoneListeners() {
    // Solicitar início da captura de áudio
    iframe.onload = () => {
        iframe.contentWindow.postMessage({ action: 'startAudioCapture' }, '*');
    };
    // Receber os dados de áudio do iframe
    window.addEventListener('message', (event) => {
        if (event.data.action === 'error') {
            console.error(`Erro na captura de áudio: ${event.data.data}`);
        } else if (event.data.action === 'audioResult') {
            const saidWords = event.data.data; // Array de transcrições
            const combinedTranscript = saidWords.map(saidWord => saidWord.transcript).join(' ');

            storeInter({
                type: 'voice',
                x: mouse.x,
                y: mouse.y,
                class: mouse.class,
                id: mouse.id,
                value: { text: combinedTranscript },
            });
        }
    });
}

function eyeCapture() {
    webgazer.setGazeListener(data => {
        if (data) {
            storeInter({ type: 'eye', x: Math.round(data.x), y: Math.round(data.y), class: mouse.class, id: mouse.id, value: null });
        }
    }).begin();
}

function faceCapture() {
    iframe.contentWindow.postMessage({ action: 'captureUserImage' }, '*');
    window.addEventListener('message', (event) => {
        if (event.data.action === 'userImageResult') {
            imageDataUrl = event.data.data;
            chrome.runtime.sendMessage({ type: "inferencia", data: imageDataUrl }, response => {
                if (response) {
                    storeInter({
                        type: 'face',
                        x: mouse.x,
                        y: mouse.y,
                        class: mouse.class,
                        id: mouse.id,
                        value: response
                    });
                }
            });
        }
    });
}

function startClock() {
    // Atualiza o clocker a cada segundo (1000 ms)
    return setInterval(() => {
        clocker++;
    }, 1000);
}

function stopClock(clockInterval) {
    clearInterval(clockInterval); // Para a atualização do clocker
    clocker = 0; // Opcional: redefinir o clocker para 0
}

function sendData() {
    chrome.runtime.sendMessage({ type: 'sendData', data: dataDict, pageHeight });
    Object.keys(dataDict).forEach(key => dataDict[key] = []);
}

// Inicializar a captura de dados
function startRecording() {
    const settings = ['mouse', 'keyboard', 'camera', 'microphone'];
    // Configurar ouvintes de eventos
    settings.forEach(setting => {
        browser.storage.sync.get([setting]).then(result => {
            if (result[setting]) {
                if (setting === 'mouse') {
                    setupMouseListeners();
                    freezeInterval = setTimeout(storeInter, 10000, { type: 'freeze', x: mouse.x, y: mouse.y, id: mouse.id, class: mouse.class, value: null });
                }
                if (setting === 'keyboard') setupKeyboardListeners();
                if (setting === 'camera') {
                    webgazer.begin().then(setupWebGazerVideo);
                    faceInterval = setInterval(faceCapture, 10000); // Executar a captura da face a cada 10 segundos
                    eyeInterval = setInterval(eyeCapture, 2000); // Executar a captura de olho a cada 2 segundos
                }
                if (setting === 'microphone') setupMicrophoneListeners();
            } else {
                console.error(`${setting} desabilitado ou não acessível.`);
            }
        });
    });
    sendInterval = setInterval(sendData, 5000);
    // Iniciar o clock
    clockInterval = startClock();
}

// Parar a captura de dados
function stopRecording() {
    // Parar o relógio
    stopClock(clockInterval);
    // Remover ouvintes de mouse
    document.removeEventListener('mousemove', storeMouseData);
    document.removeEventListener('click', storeMouseData);

    // Remover ouvintes de teclado
    document.removeEventListener('keydown', handleKeyDown);

    // Parar o webgazer (captura de olho)
    if (typeof webgazer !== 'undefined') {
        webgazer.end();  // Parar o WebGazer e limpar recursos
    }

    // Parar intervalos de captura de rosto e envio de dados
    clearInterval(faceInterval);
    clearInterval(eyeInterval);
    clearInterval(sendInterval);

    // Limpar o iframe e parar a captura de microfone
    document.body.removeChild(iframe);

    // Parar qualquer timeout ativo
    clearTimeout(freezeInterval);

    // Opcionalmente, você pode limpar o dicionário de dados
    Object.keys(dataDict).forEach(key => dataDict[key] = []);
}

// Controle da captura de dados
function initializeContent() {
    chrome.storage.sync.get(['record'], function (data) {
        record = data.record;
        if (record) {
            clearInterval(contentInterval);
            startRecording();
        }
    });
}
contentInterval = setInterval(initializeContent, 1000);
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if (request.type === "stopRecording") {
        stopRecording();
    }
});