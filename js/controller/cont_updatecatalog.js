const getTokenFromCookies = (cookieName) => {
  const cookies = document.cookie.split(';')
  for (const cookie of cookies) {
    const [name, value] = cookie.trim().split('=')
    if (name === cookieName) {
      return value
    }
  }
  return null
}

const showUpdateAlert = (message, icon = 'success') => {
  Swal.fire({
    icon: icon,
    text: message,
    showConfirmButton: false,
    timer: 100000,
  }).then(() => {
    window.location.href = 'katalog.html'
  })
}

const searchnomorById = async (nomorId) => {
  const token = getTokenFromCookies('Login')

  if (!token) {
    showUpdateAlert('Anda Belum Login', 'error')
    return
  }

  const targetURL = 'https://asia-southeast2-pasabar.cloudfunctions.net/Update-Catalog' // Replace with your API endpoint

  const myHeaders = new Headers()
  myHeaders.append('Login', token)

  const requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: JSON.stringify({ nomorid: nomorId }),
    redirect: 'follow',
  }

  try {
    const response = await fetch(targetURL, requestOptions)
    const data = await response.json()

    if (data.status === 200) {
      
      populateUpdateForm(data.data)
    } else {
      showUpdateAlert(data.message, 'error')
    }
  } catch (error) {
    console.error('Error:', error)
  }
}

const populateUpdateForm = (catalogData) => {
  const setValue = (id, value) => {
    document.getElementById(id).value = value
  }

  setValue('NomorIdInput', catalogData.nomorid)
  setValue('TitleInput', catalogData.title)
  setValue('DeskripsiInput', catalogData.description)
  setValue('ImageInput', catalogData.image)
  setValue('StatusInput', catalogData.status)

  document.getElementById('updateForm').style.display = 'block'
}

const updateCatalog = async (event) => {
  event.preventDefault()

  const token = getTokenFromCookies('Login')

  if (!token) {
    showUpdateAlert('Anda Belum Login', 'error')
    return
  }

  const targetURL = 'https://asia-southeast2-pasabar.cloudfunctions.net/Update-Catalog'

  const myHeaders = new Headers()
  myHeaders.append('Login', token)
  myHeaders.append('Content-Type', 'application/json')

  const requestOptions = {
    method: 'PUT',
    headers: myHeaders,
    body: JSON.stringify({
      nomorid: document.getElementById('NomorIdInput').value,
      title: document.getElementById('TitleInput').value,
      description: document.getElementById('DeskripsiInput').value,
      image: document.getElementById('ImageInput').value,
      status: document.getElementById('StatusInput').value,
    }),
    redirect: 'follow',
  }

  try {
    const response = await fetch(targetURL, requestOptions)
    const data = await response.json()

    if (data.status === 200) {
      showUpdateAlert('Berhasil Update Data', 'success')
      window.location.href = 'katalog.html'
    } else {
      showUpdateAlert(data.message, 'error')
    }
  } catch (error) {
    console.error('Error:', error)
  }
}

document.getElementById('updateForm').addEventListener('submit', updateCatalog)
