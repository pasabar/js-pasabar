import { setCookieWithExpireHour } from "https://jscroot.github.io/cookie/croot.js";
import Swal from "sweetalert2";
//token
export function getTokenFromAPI() {
  const tokenUrl =
    "https://asia-southeast2-pasabar.cloudfunctions.net/Admin-Login";
  fetch(tokenUrl)
    .then((response) => response.json())
    .then((tokenData) => {
      if (tokenData.token) {
        userToken = tokenData.token;
        console.log("Token dari API:", userToken);
      }
    })
    .catch((error) => console.error("Gagal mengambil token:", error));
}
export function GetDataForm() {
  const email = document.querySelector("#email").value;
  const password = document.querySelector("#password").value;
  const role = document.querySelector("#role").value;
  console.log(password);

  const data = {
    email: email,
    password: password,
    role: role,
  };
  return data;
}
//login
export function PostLogin() {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  const role = document.getElementById("role").value;

  const data = {
    email: email,
    password: password,
    role: role,
  };
  return data;
}

function ResponsePostLogin(response) {
  if (response && response.token) {
    // console.log("Token User:", response.token);
    setCookieWithExpireHour("Login", response.token, 2);
    window.location.href = "https://pasabar.my.id/Dashboard/";
    // alert("Selamat Datang");
    new Noty({
      type: "success",
      text: "Selamat Datang! Anda berhasil login.",
      timeout: 3000, // Waktu tampilan notifikasi dalam milidetik
    }).show();
  } else {
    // alert("Login gagal. Silakan coba lagi.");
    new Noty({
      type: "error",
      text: "Login gagal. Email atau password tidak valid. Silakan coba lagi.",
      timeout: 3000, // Waktu tampilan notifikasi dalam milidetik
    }).show();
  }
}

export function ResponsePost(result) {
  AlertPost(result);
}
export function ResponseLogin(result) {
  ResponsePostLogin(result);
}
