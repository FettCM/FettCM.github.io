var name = "";
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
  var jwt = token.token;
  console.log("jwt: " + jwt);

  // decode jwt
  var decoded = decode_JWT(jwt);
  console.log(decoded);
  var name = decoded.payload.given_name;
  console.log(name);

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
