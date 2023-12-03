const getTokenFromCookies = (cookieName) => {
  const cookies = document.cookie.split(';');
  for (const cookie of cookies) {
    const [name, value] = cookie.trim().split('=');
    if (name === cookieName) {
      return value;
    }
  }
  return null;
};

const getAllCatalog = async () => {
  const token = getTokenFromCookies('Login');

  if (!token) {
    Swal.fire({
      icon: 'warning',
      title: 'Authentication Error',
      text: 'You are not logged in.',
    }).then(() => {
      window.location.href = 'pages/signin.html'; 
    });
    return;
  }

  const targetURL = 'https://asia-southeast2-pasabar.cloudfunctions.net/GetAll-dataCatalog';

  const myHeaders = new Headers();
  myHeaders.append('Login', token);

  const requestOptions = {
    method: 'GET',
    headers: myHeaders,
    redirect: 'follow',
  };

  try {
    const response = await fetch(targetURL, requestOptions);
    const data = await response.json();

    if (data.status === 200) {
      displayCatalogData(data.data, 'catalogdataBody');
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: data.message,
      });
    }
  } catch (error) {
    console.error('Error:', error);
  }
};

const searchcatalog = async () => {
  const nomoridInput = document.getElementById("nomoridInput").value;

  if (!nomoridInput) {
    // alert("Please enter catalog ID");
    return;
  }

  const token = getTokenFromCookies("Login");

  if (!token) {
    // alert("Anda Belum Login");
    return;
  }

  const targetURL =
    "https://asia-southeast2-pasabar.cloudfunctions.net/GetAll-CatalogID";

  const myHeaders = new Headers();
  myHeaders.append("Login", token);

  const requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: JSON.stringify({ nomorid: nomoridInput }),
    redirect: "follow",
  };

  try {
    const response = await fetch(targetURL, requestOptions);
    const data = await response.json();

    if (data.status === 200) {
      displayCatalogData([data.data], "catalogdataBody");
    } else {
      alert(data.message);
    }
  } catch (error) {
    console.error("Error:", error);
  }
};

const deletecatalog = async (nomorid) => {
  const token = getTokenFromCookies("Login");

  if (!token) {
    // alert("Token login tidak ada");
    return;
  }

  const targetURL =
    "https://asia-southeast2-pasabar.cloudfunctions.net/Delete-Catalog";

  const myHeaders = new Headers();
  myHeaders.append("Login", token);
  myHeaders.append("Content-Type", "application/json");

  const requestOptions = {
    method: "DELETE",
    headers: myHeaders,
    body: JSON.stringify({ nomorid: nomorid }),
    redirect: "follow",
  };

  try {
    const response = await fetch(targetURL, requestOptions);
    const data = await response.json();

    if (data.status === 200) {
      // alert("catalog deleted successfully!");
      getAllcatalogs();
    } else {
      alert(data.message);
    }
  } catch (error) {
    console.error("Error:", error);
  }
};

const editcatalog = (nomorid) => {
  window.location.href = `formsupdate.html?nomorid=${nomorid}`;
};

document
  .getElementById("catalogdataBody")
  .addEventListener("click", (event) => {
    const target = event.target;
    if (target.classList.contains("edit-link")) {
      const nomorid = target.getAttribute("data-nomorid");
      editcatalog(nomorid);
    } else if (target.classList.contains("delete-link")) {
      const nomorid = target.getAttribute("data-nomorid");
      deletecatalogHandler(nomorid);
    }
  });

const deletecatalogHandler = (nomorid) => {
  if (confirm("Are you sure you want to delete this catalog?")) {
    deletecatalog(nomorid);
  }
};

const displayCatalogData = (catalog, tableBodyId) => {
  const catalogdataBody = document.getElementById(tableBodyId);

  catalogdataBody.innerHTML = "";

  if (catalog && catalog.length > 0) {
    catalog.forEach((ctl) => {
      const newRow = document.createElement("tr");
      newRow.innerHTML = `
        <td class="px-4 py-3">
          <div class="flex items-center text-sm">
            <div>
              <p class="font-semibold">${ctl.nomorid}</p>
            </div>
          </div>
        </td>
        <td class="px-4 py-3 text-sm">
          <p class="font-semibold">${ctl.title}</p>
        </td>
        <td class="px-4 py-3 text-sm">
          <p class="font-semibold">${ctl.description}</p>
        </td>
        <td class="px-4 py-3 text-sm">
          ${ctl.image}
        </td>
        <td class="px-4 py-3 text-xs">
          <span class="px-2 py-1 font-semibold leading-tight text-green-700 bg-green-100 rounded-full dark:bg-green-700 dark:text-green-100">
            ${ctl.status}
          </span>
        </td>
        <td class="px-4 py-3">
          <a href="#" class="edit-link" data-ctlloyeeid="${ctl.nomorid}">Edit</a>
          <a href="#" class="delete-link" data-ctlloyeeid="${ctl.nomorid}">Delete</a>
        </td>
      `;

      catalogdataBody.appendChild(newRow);
    });
  } else {
    catalogdataBody.innerHTML = `<tr><td colspan="6">No catalog data found.</td></tr>`;
  }
};

// Initial fetch of all catalogs
getAllCatalog();
