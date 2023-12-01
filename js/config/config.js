import { setCookieWithExpireHour } from 'https://jscroot.github.io/cookie/croot.js';

//token
export function getTokenFromAPI() {
  const tokenUrl = "https://asia-southeast2-pasabar.cloudfunctions.net/Admin-Login";
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
            const username = document.querySelector("#email").value;
            const password = document.querySelector("#password").value;
            const role = document.querySelector("#role").value;
            console.log(password)

            const data = {
                username: email,
                password: password,
                role: role
            };
            return data
}
//login
export function PostLogin() {
  const username = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  const role = document.getElementById("role").value;

  const data = {
    username: email,
    password: password,
    role: role
  };
  return data;
}



function ResponsePostLogin(response) {
  if (response && response.token) {
    console.log('Token User:', response.token);
    setCookieWithExpireHour('user_token', response.token, 2);
    window.location.href = 'https://pasabar.github.io/Dashboard/';
    Swal.fire({
      icon: 'success',
      title: 'Login Successful',
      text: 'You have successfully logged in!',
    });
  } else {
    Swal.fire({
      icon: 'error',
      title: 'Login Failed',
      text: 'Invalid email or password. Please try again.',
    });
  }
}


export function ResponsePost(result) {
    AlertPost(result);
}
export function ResponseLogin(result) {
  ResponsePostLogin(result)
}
