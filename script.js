function login() {
    alert("Login-Service aktuell nicht verfügbar. Bitte nutzen Sie den Login über Google.2222")
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
  // token value from IdentityCredential object
  jwt = token.token;
    
  // for fun reasons
  document.cookie = `jwt_token=${jwt}; path=/welcome.html;`;

  // forward to welcome page
  window.location.href = "https://fettcm.github.io/welcome.html";
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

function get_cookie(){
  const cookie_value = document.cookie.split("=");
  var jwt = cookie_value[1];

  // decode jwt to get name
  var first_name = decode_JWT(jwt).payload.given_name;

  return {
    first_name: first_name,
    jwt: jwt
  };
}


function display_username(first_name) {
  var name_span = document.getElementById('name_span');
  if (first_name && name_span) {
      name_span.textContent = first_name;
  }
}

function display_token(jwt) {
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
}
