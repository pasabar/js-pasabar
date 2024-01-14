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
    window.location.href = 'hotel.html'
  })
}

const searchnomorById = async (nomorId) => {
  const token = getTokenFromCookies('Login')

  if (!token) {
    showUpdateAlert('Anda Belum Login', 'error')
    return
  }

  const targetURL = 'https://asia-southeast2-pasabar.cloudfunctions.net/Update-Hotel'

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

const populateUpdateForm = (hotelData) => {
  const setValue = (nomorid, value) => {
    document.getElementById(nomorid).value = value
  }

  setValue('NomorIdInput', hotelData.nomorid)
  setValue('TitleInput', hotelData.title)
  setValue('DeskripsiInput', hotelData.description)
  setValue('LokasiInput', hotelData.lokasi)
  setValue('ImageInput', hotelData.image)
  setValue('StatusInput', hotelData.status)

  document.getElementById('updateForm').style.display = 'block'
}

const updateHotel = async (event) => {
  event.preventDefault()

  const token = getTokenFromCookies('Login')

  if (!token) {
    showUpdateAlert('Anda Belum Login', 'error')
    return
  }

  const targetURL = 'https://asia-southeast2-pasabar.cloudfunctions.net/Update-Hotel'

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
      window.location.href = 'hotel.html'
    } else {
      showUpdateAlert(data.message || 'Error updating data', 'error')
    }
  } catch (error) {
    console.error('Error:', error)
    showUpdateAlert('Error updating data', 'error')
  }
}

document.getElementById('updateForm').addEventListener('submit', updateHotel)
