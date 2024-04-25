
const btnBack = document.querySelector('#back')
const guardarArchivo = document.querySelector('#next')

let getInfoArchivos = []

const postArchivo = async () => {
  const res = await fetch('/nuevo-envio/post-archivo', {
    method: 'POST',
    credentials: 'same-origin',
    body: JSON.stringify(getInfoArchivos),
    headers: {
      'Content-Type': 'application/json'
    }
  })
  const ress = await res.json()
  console.log(ress)
  if (res.status !== 200) {
    Swal.fire({
      icon: 'warning',
      text: 'Error, intentelo de nuevo',
      background: '#1b396a',
      color: '#fff'

    })
  }
  localStorage.removeItem('json')
  window.location.href = '/mis-documentos'
}

guardarArchivo.addEventListener('click', () => {
  postArchivo()
})

btnBack.addEventListener('click', () => {
  window.location.href = '/nuevo-envio/revisar'
})

const formatPalabrasclaves = () => {
  if (!localStorage.getItem('json')) return
  getInfoArchivos = JSON.parse(localStorage.getItem('json'))
  getInfoArchivos.palabras_clave = getInfoArchivos.palabras_clave.map(item => {
    return { nombre: item }
  })
}

window.addEventListener('load', formatPalabrasclaves)
