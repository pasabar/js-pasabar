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
    window.location.href = 'wisata.html'
  })
}

const searchnomorById = async (nomorId) => {
  const token = getTokenFromCookies('Login')

  if (!token) {
    showUpdateAlert('Anda Belum Login', 'error')
    return
  }

  const targetURL = 'https://asia-southeast2-pasabar.cloudfunctions.net/UpdateWisata'

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

    if (response.ok) {
      populateUpdateForm(data.data)
    } else {
      showUpdateAlert(data.message || 'Error fetching data', 'error')
    }
  } catch (error) {
    console.error('Error:', error)
    showUpdateAlert('Error fetching data', 'error')
  }
}

const populateUpdateForm = (wisataData) => {
  const setValue = (id, value) => {
    document.getElementById(id).value = value
  }

  setValue('NomorIdInput', wisataData.nomorid)
  setValue('TitleInput', wisataData.title)
  setValue('DeskripsiInput', wisataData.description)
  setValue('LokasiInput', wisataData.lokasi)
  setValue('ImageInput', wisataData.image)
  setValue('StatusInput', wisataData.status)

  document.getElementById('updateForm').style.display = 'block'
}

const updateWisata = async (event) => {
  event.preventDefault()

  const token = getTokenFromCookies('Login')

  if (!token) {
    showUpdateAlert('Anda Belum Login', 'error')
    return
  }

  const targetURL = 'https://asia-southeast2-pasabar.cloudfunctions.net/UpdateWisata'

  const myHeaders = new Headers()
  myHeaders.append('Login', token)
  myHeaders.append('Content-Type', 'application/json')

  const statusValue = document.getElementById('StatusInput').value === 'active'

  const requestOptions = {
    method: 'PUT',
    headers: myHeaders,
    body: JSON.stringify({
      nomorid: parseInt(document.getElementById('NomorIdInput').value),
      title: document.getElementById('TitleInput').value,
      description: document.getElementById('DeskripsiInput').value,
      lokasi: document.getElementById('LokasiInput').value,
      image: document.getElementById('ImageInput').value,
      status: statusValue,
    }),
    redirect: 'follow',
  }

  try {
    const response = await fetch(targetURL, requestOptions)
    const data = await response.json()

    if (response.ok) {
      showUpdateAlert('Berhasil Update Data', 'success')
      window.location.href = 'wisata.html'
    } else {
      showUpdateAlert(data.message || 'Error updating data', 'error')
    }
  } catch (error) {
    console.error('Error:', error)
    showUpdateAlert('Error updating data', 'error')
  }
}

document.getElementById('updateForm').addEventListener('submit', updateWisata)
