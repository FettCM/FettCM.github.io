var name = "";
var token = "";
function login() {
    alert("Login-Service aktuell nicht verfügbar. Bitte nutzen Sie den Login über Google.")
}

async function google_login() {
  try {
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
    //
    setTimeout(1000);
    console.log(token);

    // decode token
    var decoded = decode_JWT(token);
    console.log(decoded);
    var name = decoded.payload.given_name;
    console.log(name);

    // forward to welcome page
    window.location.href = "https://fettcm.github.io/FettCM/welcome.html";
  }
  catch {
    // user is not logged into IdP
    alert("Please log into the Google IdP.")
    window.location.href = "https://accounts.google.com/gsi/fedcm/signin";
  }
}

function decode_JWT (token){
  const parts = token.split('.');
  const header = JSON.parse(atob(parts[0]));
  const payload = JSON.parse(atob(parts[1]));

  return {
    header: header,
    payload: payload
  };
}

function split_JWT(token){
  const parts = token.split('.');
  const header = parts[0];
  const payload = parts[1];
  
  return {
    header: header,
    payload: payload
  };
}
