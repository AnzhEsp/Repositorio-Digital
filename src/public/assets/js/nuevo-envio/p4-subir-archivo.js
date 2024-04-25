/* eslint-disable object-shorthand */
const inputFile = document.querySelector('#file')
const descripcionFichero = document.querySelector('#desc-fichero')
const motivoembargo = document.querySelector('#text_motivo')
const btnAgregarArchivo = document.querySelector('.btn-agregar_archivo')
const divAgregarArchivos = document.querySelector('.especificaciones-global')
const btnNext = document.querySelector('#next')
const btnBack = document.querySelector('#back')
let dataJson = []
let paintArchivos = []
let archivos = []
btnAgregarArchivo.addEventListener('click', async () => {
  const { name: nombre, size: tamano, type } = inputFile.files[0]

  const data = await getBase64(inputFile.files[0])
  const descripcionArchivo = descripcionFichero.value
  const motivoEmbargo = motivoembargo.value
  const [formato] = type.split('/').filter(item => item === 'pdf')

  if (archivos.length > 0 && archivos.findIndex(item => item.nombre === nombre) !== -1) {
    Swal.fire({
      icon: 'warning',
      text: 'Archivo duplicado',
      background: '#1b396a',
      color: '#fff'

    })
    return
  }
  archivos.push({

    nombre,
    tamano,
    formato,
    descripcion_archivo: descripcionArchivo,
    motivo_embargo: motivoEmbargo,
    base_data: data
  })

  agregarArchivoList(nombre, tamano, descripcionArchivo, formato, nombre)
})

// pasa al archivo a base64
const getBase64 = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => {
      const base64 = reader.result.split(',')
      resolve(base64[1])
    }
    reader.onerror = error => reject(error)
  })
}

const agregarArchivoList = (nombre, tamano, descripcion, formato, id) => {
  formato.toUpperCase()
  const agregarArchivos = document.createElement('DIV')
  agregarArchivos.classList.add('datos-1')
  agregarArchivos.classList.add('cuadrilla')
  agregarArchivos.innerHTML = `

          <div class="especificaciones-2">
            <div class="especificaciones-contenedores content-espec">
              <input type="radio" name="primary-file" id="archivo_primario">
            </div>
            <div class="especificaciones-contenedores content-espec">
              <h6>${nombre}</h6>
            </div>
            <div class="especificaciones-contenedores content-espec">
              <h6>${tamano} KB</h6>
            </div>
            <div class="especificaciones-contenedores content-espec">
              <h6>${descripcion}</h6>
            </div>
            <div class="especificaciones-contenedores content-espec">
              <h6>${formato}</h6>
            </div>
            <div class="especificaciones-contenedores content-espec">
              <div class="img-svg-1">
                <img src="/assets/img/trash.svg" data-name="${id}" class="img-svg-1"alt="">
              </div>
            </div>
          </div>
  `
  divAgregarArchivos.appendChild(agregarArchivos)

  agregarArchivos.addEventListener('click', (e) => {
    if (e.target.classList.contains('img-svg-1')) {
      eliminarArchivo(agregarArchivos)
      const nombre = e.target.dataset.name
      // eliminarArchivoJson(name)
      eliminarArchivoArray(nombre)
    }
    e.stopPropagation()
  })
}

const eliminarArchivoArray = (nombre) => {
  archivos = archivos.filter(item => item.nombre !== nombre)
}
function eliminarArchivo (divEliminar) {
  divAgregarArchivos.removeChild(divEliminar)
}

btnNext.addEventListener('click', () => {
  validarForm()
})

// const guardarArchivos = () => {
//   const archivosName = archivos.map(item => item.nombre)
//   const data = JSON.parse(localStorage.getItem('json'))
//   data.subir = archivosName
//   localStorage.setItem('json', JSON.stringify(data))
//   window.location.href = '/nuevo-envio/revisar'
// }
const validarForm = async () => {
  archivos.length > 0 || paintArchivos.length > 0
    ? enviarArchivos()
    : Swal.fire({
      icon: 'warning',
      text: 'Falta agregar archivo',
      background: '#1b396a',
      color: '#fff'

    })
}
btnBack.addEventListener('click', () => {
  window.location.href = '/nuevo-envio/acceder'
})

const enviarArchivos = async () => {
  try {
    const archivosEnviar = []
    archivos.forEach(item => {
      archivosEnviar.push({
        nombre: item.nombre,
        descripcion_archivo: item.descripcion_archivo,
        motivo_embargo: item.motivo_embargo,
        base_data: item.base_data
      })
    })
    const res = await fetch('/archivo/subir-archivo', {
      headers: { 'Content-type': 'application/json;charset=UTF-8' },
      method: 'post',
      body: JSON.stringify(archivosEnviar)
    })
    if (res.status !== 200) throw new Error()
    const json = await res.json()
    let archivosArray = archivos.map(item => {
      json.idArchivos.forEach(itemJson => {
        if (item.nombre === itemJson.nombre) item.id = itemJson.id_archivo
      })
      const { base_data, ...rest } = item
      return rest
    })
    if (paintArchivos.length > 0) archivosArray = [...paintArchivos, ...archivosArray]

    dataJson.subir = archivosArray

    localStorage.setItem('json', JSON.stringify(dataJson))
    window.location.href = '/nuevo-envio/revisar'
  } catch (error) {
    Swal.fire({
      icon: 'warning',
      text: 'Intentelo de nuevo',
      background: '#1b396a',
      color: '#fff'

    })
  }
}

const deleteArchivoFetch = async (id) => {
  const res = await fetch(`/archivo/delete/${id}`, {
    headers: { 'Content-type': 'application/json;charset=UTF-8' },
    method: 'delete'
  })
  const json = await res.json()
  return json
}

const reloadArchivosGuardados = (nombre, tamano, descripcion, formato, id) => {
  formato.toUpperCase()
  const agregarArchivos = document.createElement('DIV')
  agregarArchivos.classList.add('datos-1')
  agregarArchivos.classList.add('cuadrilla')
  agregarArchivos.innerHTML = `

          <div class="especificaciones-2">
            <div class="especificaciones-contenedores content-espec">
              <input type="radio" name="primary-file" id="archivo_primario">
            </div>
            <div class="especificaciones-contenedores content-espec">
              <h6>${nombre}</h6>
            </div>
            <div class="especificaciones-contenedores content-espec">
              <h6>${tamano} KB</h6>
            </div>
            <div class="especificaciones-contenedores content-espec">
              <h6>${descripcion}</h6>
            </div>
            <div class="especificaciones-contenedores content-espec">
              <h6>${formato}</h6>
            </div>
            <div class="especificaciones-contenedores content-espec">
              <div class="img-svg-1">
                <img src="/assets/img/trash.svg" data-id="${id}" class="img-svg-1"alt="">
              </div>
            </div>
          </div>
  `
  divAgregarArchivos.appendChild(agregarArchivos)
  agregarArchivos.addEventListener('click', async (e) => {
    if (e.target.classList.contains('img-svg-1')) {
      eliminarArchivo(agregarArchivos)
      const id = e.target.dataset.id
      const res = await deleteArchivoFetch(id)
      console.log(res)
    }
    e.stopPropagation()
  })
}

window.addEventListener('load', () => {
  if (!localStorage.getItem('json')) {
    dataJson = []
    return
  }
  dataJson = JSON.parse(localStorage.getItem('json'))
  if (dataJson.hasOwnProperty('subir')) {
    paintArchivos = dataJson.subir
    paintArchivos.forEach(item => reloadArchivosGuardados(item.nombre, item.tamano, item.descripcion_archivo, item.formato, item.id))
  }
})

window.onbeforeunload = () => {
  alert()
}
