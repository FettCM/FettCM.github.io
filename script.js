const images = document.querySelectorAll('.gallery-img');

images.forEach(img => {
    img.addEventListener('mouseover', () => {
        img.nextElementSibling.style.opacity = '1';
    });

    img.addEventListener('mouseout', () => {
        img.nextElementSibling.style.opacity = '0';
    });
});


function login() {
    alert("Login-Service aktuell nicht verfügbar. Bitte nutzen Sie den Login über Google.")
}

// https://accounts.google.com/gsi/fedcm.json
function wwwgoogle_login() {
    let url = "https://accounts.google.com/gsi/fedcm/signin";
    window.location.href = url;
}


async function google_login() {

    let token = await navigator.credentials.get(
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

    console.log(token)
}
