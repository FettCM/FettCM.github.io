var given_name = "";
var jwt = "";
function login() {
    alert("Login-Service aktuell nicht verfügbar. Bitte nutzen Sie den Login über Google.")
}

async function google_login() {
  token = await navigator.credentials.get(
      {
          "identity": {
            "providers": [
              {
                "configURL": "https://accounts.google.com/gsi/fedcm.json",
                "clientId": "342508061076-mq47slkvmimktvh3ht8lmql4f344ij67.apps.googleusercontent.com",
                "nonce": "1337"
              }
            ],
            "context": "signin"
          }
      }
  )
  jwt = token.token;
  console.log("jwt: " + jwt);

  // decode jwt
  var decoded = decode_JWT(jwt);
  console.log(decoded);
  given_name = decoded.payload.given_name;
  console.log(given_name);

  // forward to welcome page
  window.location.href = "https://fettcm.github.io/FettCM/welcome.html";
}

function decode_JWT (jwt){
  const parts = jwt.split('.');
  const header = JSON.parse(atob(parts[0]));
  const payload = JSON.parse(atob(parts[1]));

  return {
    header: header,
    payload: payload
  };
}

function display_username() {
  var name_span = document.getElementById('name_span');
  if (given_name && name_span) {
      name_span.textContent = given_name;
  }
}

function display_token() {
  setTimeout(function() {

      // container for token
      var token_container = document.getElementById('token_container');
      
      if (jwt && token_container) {
          var text = "Token: " + jwt;
          token_container.textContent = text;

          if (token_container.scrollWidth > token_container.clientWidth) {
              token_container.style.wordWrap = "break-word"
          }
          token_container.style.textAlign = "left";
      }
  }, 1000); 
}
