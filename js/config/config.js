import { setCookieWithExpireHour } from 'https://jscroot.github.io/cookie/croot.js';

//token
export function getTokenFromAPI() {
  const tokenUrl = "https://asia-southeast2-pasabar.cloudfunctions.net/loginpasabar";
  fetch(tokenUrl)
    .then(response => response.json())
    .then(tokenData => {
      if (tokenData.token) {
        userToken = tokenData.token;
        console.log('Token dari API:', userToken);
      }
    })
    .catch(error => console.error('Gagal mengambil token:', error));
}
export function GetDataForm(){
            const username = document.querySelector("#username").value;
            const password = document.querySelector("#password").value;
            const role = document.querySelector("#role").value;
            console.log(password)

            const data = {
                username: username,
                password: password,
                role: role
            };
            return data
}
//login
export function PostLogin() {
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;
  const role = document.getElementById("role").value;

  const data = {
    username: username,
    password: password,
    role: role
  };
  return data;
}

export function AlertPost(value){
    alert(value.message + "\nRegistrasi Berhasil")
    window.location.href= "login.html"
}


function ResponsePostLogin(response) {
  if (response && response.token) {
    console.log('Token User:', response.token);
    setCookieWithExpireHour('user_token', response.token, 2);
    window.location.href = 'https://pasabar.github.io/Dashboard/';
    alert("Selamat Datang")
  } else {
    alert('Login gagal. Silakan coba lagi.');
  }
}


export function ResponsePost(result) {
    AlertPost(result);
}
export function ResponseLogin(result) {
  ResponsePostLogin(result)
}
