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

const updateWisata = async (event) => {
  event.preventDefault();

  const token = getTokenFromCookies("Login");

  if (!token) {
    showUpdateAlert("Anda Belum Login", "error");
    return;
  }

  const targetURL =
    "https://asia-southeast2-pasabar.cloudfunctions.net/UpdateWisata";

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
      window.location.href = "wisata.html";
    } else {
      showUpdateAlert(data.message || "Error updating data", "error");
    }
  } catch (error) {
    console.error("Error:", error);
    showUpdateAlert("Error updating data", "error");
  }
};

document.getElementById("updateForm").addEventListener("submit", updateWisata);

// Fetch data from the API using a GET request
const apiUrl = "https://asia-southeast2-pasabar.cloudfunctions.net/GetOneWisata";
const params = new URLSearchParams(window.location.search);
const wisataId = params.get("_id");

// Check if the wisataId is available
if (wisataId) {
  const fullApiUrl = `${apiUrl}?_id=${wisataId}`;
  console.log("Full API URL:", fullApiUrl);

  fetch(fullApiUrl)
    .then((response) => response.json())
    .then((data) => {
      console.log("API Response:", data);

      const wisataData = data.data[0];

      document.getElementById("NomorIdInput").value = wisataData.nomorid;
      document.getElementById("TitleInput").value = wisataData.title;
      document.getElementById("DeskripsiInput").value = wisataData.description;
      document.getElementById("LokasiInput").value = wisataData.lokasi;
      document.getElementById("ImageInput").value = wisataData.image;
      document.getElementById("StatusInput").value = wisataData.status;

      // Show the update form
      document.getElementById("updateForm").style.display = "block";
    })
    .catch((error) => {
      console.error("Error fetching data:", error);
    });
}



