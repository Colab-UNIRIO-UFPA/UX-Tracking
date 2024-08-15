document.addEventListener('DOMContentLoaded', () => {
  chrome.runtime.sendMessage({type: "getServerUrl"}, function(response){
    baseUrl = response.reply;
    document.getElementById('forgotPass').href = baseUrl + "/forgot_pass";
    document.getElementById('register').href = baseUrl + "/register";
  });

  chrome.storage.sync.get('authToken', function (data) {
    if (data.authToken) {
      document.getElementById("divLogin").style.display = "none";
      document.getElementById("mainContent").style.display = "";
    } else {
      notification();
      var formLogin = $('#formLogin');

      formLogin.submit(function (e) {
        e.preventDefault();
        const username = $("#username").val();
        const password = $("#password").val();

        $.post(baseUrl + "/userAuth",
          {
            username: username,
            password: password
          },
          function (authToken) {
            if (authToken.status == 200) {
              chrome.storage.sync.set({ "authToken": authToken.id }, function () {
                console.log("User Authenticated!");
              });

              document.getElementById("divLogin").style.display = "none";
              document.getElementById("mainContent").style.display = "";
            } else {
              // Mensagem de erro de login
              var divExist = document.getElementById('errorLogin');
              if (divExist) {
                // Se a div existir, remova-a
                divExist.parentNode.removeChild(divExist);
              }
              var div = document.createElement('div');
              div.style.color = 'red';
              div.id = 'errorLogin';
              div.textContent = 'Verifique seu nome de usuário e senha e tente novamente';
              var targetElement = document.getElementById('login');
              targetElement.insertAdjacentElement('beforebegin', div);
            }
          });
      });
    }
  });

  // Define redirecionamentos
  const links = document.querySelectorAll("a");
  links.forEach(link => {
    const location = link.getAttribute('href');
    link.addEventListener('click', () => chrome.tabs.create({ active: true, url: location }));
  });
});

function notification() {
  var options = {
    type: 'basic',
    iconUrl: 'logo.png',
    title: 'UX-Tracking: Login necessário!',
    message: 'Faça o login para iniciar a captura!\nClique no botão abaixo ou abra o menu da extensão.',
    buttons: [{ title: 'Fazer login' }]
  };

  chrome.notifications.create('loginNotification', options, function (notificationId) {
    // Define um ouvinte para o clique na notificação
    chrome.notifications.onButtonClicked.addListener(function (clickedNotificationId, buttonIndex) {
      if (clickedNotificationId === 'loginNotification' && buttonIndex === 0) {
        // Abre a popup da extensão quando o usuário clica no botão "Fazer Login"
        chrome.windows.create({
          url: 'popup/index.html', // Substitua pelo URL da sua popup HTML
          type: 'popup',
          width: 300,
          height: 350
        });
      }
    });
  });
}

let btnlgout = document.getElementById('logout');

btnlgout.addEventListener('click', function(){

    $.post(baseUrl + "/userLogout", function(authToken){
      if (authToken.status == 200){
        chrome.storage.sync.remove("authToken", function (){
            console.log("logout sucessfully")
        });

        document.getElementById("divLogin").style.display = "";
        document.getElementById("mainContent").style.display = "none";

      }
    })  
  })