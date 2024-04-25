
const $ = selector => document.querySelector(selector)

const btn = $('#registrar-nuevo')

btn.addEventListener('click', async (e) => {
  const formRegistro = $('#form__registro')
  const data = new FormData(formRegistro)
  const jsonData = []

  data.forEach(data => jsonData.push(data))

  if (jsonData.includes('')) {
    return Swal.fire({
      text: 'No puedes dejar un campo vacío.',
      icon: 'warning',
      confirmButtonText: 'Cerrar'
    })
  }
})
