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

const GetAllHotel = async () => {
  const token = getTokenFromCookies('Login')

  if (!token) {
    Swal.fire({
      icon: 'warning',
      title: 'Authentication Error',
      text: 'You are not logged in.',
    }).then(() => {
      window.location.href = 'https://pasabar.my.id/pages/signin.html'
    })
    return
  }

  const targetURL = 'https://asia-southeast2-pasabar.cloudfunctions.net/GetAll-Hotel'

  const myHeaders = new Headers()
  myHeaders.append('Login', token)

  const requestOptions = {
    method: 'GET',
    headers: myHeaders,
    redirect: 'follow',
  }

  try {
    const response = await fetch(targetURL, requestOptions)
    const data = await response.json()

    if (data.status === true) {
      displayHotelData(data.data, 'HotelDataBody')
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: data.message,
      })
    }
  } catch (error) {
    console.error('Error:', error)
  }
}

const deleteHotel = async (nomorId) => {
  const token = getTokenFromCookies('Login')

  if (!token) {
    showAlert('Header Login Not Found', 'error')
    return
  }

  const targetURL = 'https://asia-southeast2-pasabar.cloudfunctions.net/Delete-Hotel'

  const myHeaders = new Headers()
  myHeaders.append('Login', token)
  myHeaders.append('Content-Type', 'application/json')

  const requestOptions = {
    method: 'DELETE',
    headers: myHeaders,
    body: JSON.stringify({ nomorid: nomorId }),
    redirect: 'follow',
  }

  try {
    const response = await fetch(targetURL, requestOptions)
    const data = await response.json()

    if (data.status) {
      Swal.fire({
        icon: 'success',
        title: 'Success',
        text: 'data hotel deleted successfully!',
      }).then(() => {
        GetAllHotel()
      })
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Error', 
        text: data.message,
      })
    }
  } catch (error) {
    console.error('Error:', error)
  }
}

// Function to handle the delete confirmation
const deleteHotelHandler = (nomorId) => {
  Swal.fire({
    title: 'Are you sure?',
    text: "You won't be able to revert this!",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Yes, delete it!',
  }).then((result) => {
    if (result.isConfirmed) {
      deleteHotel(nomorId)
    }
  })
}

const editHotel = (_id) => {
  window.location.href = `formedit_hotel.html?_id=${_id}`
}
// Event listener to handle clicks on the table
document.getElementById('HotelDataBody').addEventListener('click', (event) => {
  const target = event.target
  if (target.classList.contains('edit-link')) {
    const _id = parseInt(target.getAttribute('data-_id'))
    editHotel(_id)
  } else if (target.classList.contains('delete-link')) {
    const nomorId = parseInt(target.getAttribute('data-nomorid'))
    deleteHotelHandler(nomorId)
  }
})

const displayHotelData = (hotelData, tableBodyId) => {
  const hotelDataBody = document.getElementById(tableBodyId)

  hotelDataBody.innerHTML = ''

  if (hotelData && hotelData.length > 1) {
    hotelData.forEach((item) => {
      const newRow = document.createElement('tr')
      newRow.innerHTML = `
        <td class="px-4 py-3">${item.nomorid}</td>
        <td class="px-4 py-3">${item.title}</td>
        <td class="px-4 py-3">${item.description}</td>
        <td class="px-4 py-3">${item.lokasi}</td>
        <td class="px-4 py-3">
          <img src="${item.image}" alt="Catalog Image" style="max-width: 100px; max-height: 100px;">
        </td>
        <td class="px-4 py-3">${item.status ? 'Active' : 'Inactive'}</td>
        <td class="px-4 py-3">
          <a href="formedit_hotel.html?_id=${item._id}">Edit</a>
          <a href="#" class="delete-link" data-nomorid="${item.nomorid}">Delete</a>
        </td>
      `

      hotelDataBody.appendChild(newRow)
    })
  } else {
    hotelDataBody.innerHTML = `<tr><td colspan="6">No hotel data found.</td></tr>`
  }
}

// Initial fetch of all catalogs
GetAllHotel()
