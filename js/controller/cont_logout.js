import { deleteCookie } from "https://jscroot.github.io/cookie/croot.js";

function logout() {
  deleteCookie("Login");
  window.location.href = "https://pasabar.my.id/pages/signin.html";
}

document.getElementById("logout").addEventListener("click", logout);
