const getLoginToken = (cookieName) => {
  const cookies = document.cookie.split(';')
  for (const cookie of cookies) {
    const [name, value] = cookie.trim().split('=')
    if (name === cookieName) {
      return value
    }
  }
  return null
}

const showAlert = (message, type = 'success') => {
  Swal.fire({
    icon: type,
    text: message,
    showConfirmButton: false,
    timer: 1500,
  })
}

const insertCatalog = async (event) => {
  event.preventDefault()

  const token = getTokenFromCookies('Login')

  if (!token) {
    showAlert('Header Login Not Found', 'error')
    return
  }

  const targetURL = 'https://asia-southeast2-pasabar.cloudfunctions.net/Insert-Catalog'

  const myHeaders = new Headers()
  myHeaders.append('Login', token)
  myHeaders.append('Content-Type', 'application/json')

  const requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: JSON.stringify({
      nomorid: parseInt(document.getElementById('newNomorID').value),
      title: document.getElementById('newTitle').value,
      description: document.getElementById('newDeskripsi').value,
      image: document.getElementById('newImage').value,
      status: document.getElementById('newStatus').value === 'active' ? true : false,
    }),
    redirect: 'follow',
  }

  try {
    const response = await fetch(targetURL, requestOptions)
    const data = await response.json()

    if (data.status === false) {
      showAlert(data.message, 'error')
    } else {
      showAlert('Catalog data inserted successfully!', 'success')
      window.location.href = 'katalog.html'
    }
  } catch (error) {
    console.error('Error:', error)
  }
}

document.getElementById('newCatalogForm').addEventListener('submit', insertCatalog)
