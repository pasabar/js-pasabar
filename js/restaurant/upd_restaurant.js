const getTokenFromCookies = (cookieName) => {
  const cookies = document.cookie.split(";");
  for (const cookie of cookies) {
    const [name, value] = cookie.trim().split("=");
    if (name === cookieName) {
      return value;
    }
  }
  return null;
};

const showUpdateAlert = (message, icon = "success") => {
  Swal.fire({
    icon: icon,
    text: message,
    showConfirmButton: false,
    timer: 100000,
  }).then(() => {
    window.location.href = "katalog.html";
  });
};

const updateRestaurant = async (event) => {
  event.preventDefault();

  const token = getTokenFromCookies("Login");

  if (!token) {
    showUpdateAlert("Anda Belum Login", "error");
    return;
  }

  const targetURL =
    "https://asia-southeast2-pasabar.cloudfunctions.net/Update-Restoran";

  const myHeaders = new Headers();
  myHeaders.append("Login", token);
  myHeaders.append("Content-Type", "application/json");

  const statusValue = document.getElementById("StatusInput").value === "active";

  const requestOptions = {
    method: "PUT",
    headers: myHeaders,
    body: JSON.stringify({
      nomorid: parseInt(document.getElementById("NomorIdInput").value),
      title: document.getElementById("TitleInput").value,
      description: document.getElementById("DeskripsiInput").value,
      lokasi: document.getElementById("LokasiInput").value,
      image: document.getElementById("ImageInput").value,
      status: statusValue,
    }),
    redirect: "follow",
  };

  try {
    const response = await fetch(targetURL, requestOptions);
    const data = await response.json();

    if (response.ok) {
      showUpdateAlert("Berhasil Update Data", "success");
      window.location.href = "restaurant.html";
    } else {
      showUpdateAlert(data.message || "Error updating data", "error");
    }
  } catch (error) {
    console.error("Error:", error);
    showUpdateAlert("Error updating data", "error");
  }
};

document
  .getElementById("updateForm")
  .addEventListener("submit", updateRestaurant);

// Fetch data from the API using a GET request
const apiUrl =
  "https://asia-southeast2-pasabar.cloudfunctions.net/GetOneRestoran";
const params = new URLSearchParams(window.location.search);
const restaurantId = params.get("_id");

// Check if the restaurantId is available
if (restaurantId) {
  const fullApiUrl = `${apiUrl}?_id=${restaurantId}`;
  console.log("Full API URL:", fullApiUrl);

  fetch(fullApiUrl)
    .then((response) => response.json())
    .then((datar) => {
      console.log("API Response:", datar);

      const restaurantData = datar.datar[0];

      document.getElementById("NomorIdInput").value = restaurantData.nomorid;
      document.getElementById("TitleInput").value = restaurantData.title;
      document.getElementById("DeskripsiInput").value =
        restaurantData.description;
      document.getElementById("LokasiInput").value = restaurantData.lokasi;
      document.getElementById("ImageInput").value = restaurantData.image;
      document.getElementById("StatusInput").value = restaurantData.status;

      // Show the update form
      document.getElementById("updateForm").style.display = "block";
    })
    .catch((error) => {
      console.error("Error fetching data:", error);
    });
}
