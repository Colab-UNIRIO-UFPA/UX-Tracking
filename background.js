const serverUrl = "http://localhost:5000/external";
// Cria um objeto Date com a data e hora atuais
var datetime = new Date();
var userId = '';
chrome.storage.sync.get(['authToken'], function (data) {
    if (data) {
        userId = data.authToken;
    }
});

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    switch (request.type) {
        case "getServerUrl":
            sendResponse({ reply: serverUrl });
            break;
        case "startRecording":
            console.log('Iniciando a captura de dados.');
            chrome.storage.sync.get(['authToken'], function (data) {
                userId = data.authToken;
            });
            break;
        case "stopRecording":
            // Enviar a mensagem para o content.js
            chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
                if (tabs.length > 0 && tabs[0].id) {
                    chrome.tabs.sendMessage(tabs[0].id, { type: "stopRecording" }, function (response) {
                        if (chrome.runtime.lastError) {
                            // O content script não está ativo ou ocorreu outro erro
                            console.log("Capture de dados interrompida fora da aba.");
                        } else {
                            console.log("Capture de dados interrompida na aba.");
                        }
                    });
                } else {
                    console.log('Nenhuma aba ativa encontrada para parar a captura.');
                }
            });
            break;
        case "inferencia":
            sendFace(request.data)
                .then(responseData => sendResponse(JSON.parse(responseData)))
                .catch(error => console.error("Erro no reconhecimento facial: ", error));
            return true; // Mantém sendResponse ativo
        case "error":
            console.error(`Erro recebido: ${request.message}`);
            break;
        case "log":
            console.error(`Log recebido: ${request.message}`);
            break;
        case "sendData":
            capture(request.data, request.pageHeight);
            break;
    }
    return true; // Para tratamento assíncrono de sendResponse
});

function capture(data, pageHeight) {
    chrome.windows.getCurrent(function (win) {
        chrome.tabs.query({
            active: true,
            lastFocusedWindow: true
        }, function (tabs) {
            if (tabs && tabs[0] && tabs[0].url) {
                var url = new URL(tabs[0].url);
                var domain = url.hostname;
                chrome.tabs.captureVisibleTab(win.id, { format: "jpeg", quality: 25 }, function (screenshotUrl) {
                    if (chrome.runtime.lastError || !screenshotUrl) {
                        console.error('Erro ao capturar a tela: ', chrome.runtime.lastError?.message);
                        return;
                    }
                    var content = {
                        data: data,
                        metadata: {
                            userID: userId,
                            dateTime: datetime,
                            image: screenshotUrl,
                            height: pageHeight,
                            site: domain
                        }
                    }
                    post(content);
                });
            } else {
                console.error('Nenhuma aba ativa encontrada.');
            }
        });
    });
}

async function post(content) {
    try {
        const response = await fetch(`${serverUrl}/receiver`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(content)
        });
        console.log("Response Status:", response.status, await response.text());
    } catch (error) {
        console.error("Erro ao enviar dados para o servidor:", error);
    }
}

async function sendFace(image) {
    const response = await fetch(`${serverUrl}/faceExpression`, {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams({ data: image })
    });
    return response.text();
}