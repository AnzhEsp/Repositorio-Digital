const inputs = document.querySelectorAll('.input_desc')
const btnNext = document.querySelector('#next')
// variables de autores
const divAutoresAñadidos = document.querySelector('.autores-añadidos')
const btnAgregarAutor = document.querySelector('.img-agregar-autor')
const inputNombre = document.getElementsByName('nombre')
const apellidoPaterno = document.getElementsByName('apellido_paterno')
const apellidoMaterno = document.getElementsByName('apellido_materno')

// variables de identificadores
const btnAgregarIdentif = document.querySelector('.btn-agregar-identif')
const identificadorCodigo = document.getElementsByName('identificador_codigo')
const identificadorNumeros = document.getElementsByName('identificador_numeros')
const identifTiposAnadidosPadre = document.querySelector('.identif-tipos_anadidos')
// Se guardara uno o mas autores
let autores = []
// Se guardara uno o mas identificadores
let identificadores = []
// Se guardara toda la info del usuario en el json data
let data = {}

// crea el json con la referencia de su names de los inputs
inputs.forEach((item, index) => {
  if (index > 2 && index !== 12 && index !== 11) {
    data[item.getAttribute('name')] = item.value || ''
  }
})
// console.log(data)
btnAgregarAutor.addEventListener('click', () => {
  if (apellidoPaterno[0].value !== '' && inputNombre[0].value !== '' && apellidoMaterno !== '') {
    console.log(autores)
    autores.push({
      nombre: inputNombre[0].value,
      apellido_paterno: apellidoPaterno[0].value,
      apellido_materno: apellidoMaterno[0].value
    })
    const agregarAutoresP = document.createElement('DIV')
    agregarAutoresP.classList.add('container-autores')
    agregarAutoresP.innerHTML = `<p>
 ${inputNombre[0].value} ${apellidoPaterno[0].value} ${apellidoMaterno[0].value}</p>  <img class="btn-trash" src="/assets/img/trash.svg" alt="" />
  `
    divAutoresAñadidos.appendChild(agregarAutoresP)
    apellidoPaterno[0].value = ''
    apellidoMaterno[0].value = ''
    inputNombre[0].value = ''
    const btnEliminarAutores = agregarAutoresP.lastElementChild
    // Eliminar autores
    btnEliminarAutores.addEventListener('click', (e) => {
      const div = e.target.parentElement
      divAutoresAñadidos.removeChild(div)
    })
  }
})

btnAgregarIdentif.addEventListener('click', () => {
  if (identificadorCodigo[0].value !== '' && identificadorNumeros[0].value !== '') {
    const agregarIndetificadores = document.createElement('DIV')
    agregarIndetificadores.classList.add('container-indentificadores')
    agregarIndetificadores.innerHTML = `<p>
 ${identificadorCodigo[0].value} ${identificadorNumeros[0].value}</p>  <img class="btn-trash" src="/assets/img/trash.svg" alt="" />
  `
    identificadores.push({
      identificador_codigo: identificadorCodigo[0].value,
      identificador_numeros: identificadorNumeros[0].value
    })

    identifTiposAnadidosPadre.appendChild(agregarIndetificadores)
    identificadorNumeros[0].value = ''
    // Evento click eliminar
    agregarIndetificadores.lastElementChild.addEventListener('click', (e) => {
      identifTiposAnadidosPadre.removeChild(e.target.parentElement)
    })
  }
})

btnNext.addEventListener('click', () => {
  validarFormulario()
})
window.addEventListener('load', () => {
  inputNombre[0].value = ''
  apellidoPaterno[0].value = ''
  apellidoMaterno[0].value = ''
  if (!localStorage.getItem('json')) {
    inputs.forEach((item, index) => {
      if (index > 2 && index !== 5 && index !== 11 && index < 12) {
        item.value = ''
      }
    })
    return
  }
  data = { ...data, ...JSON.parse(localStorage.getItem('json')) }
  autores = data.autores || []
  identificadores = data.identificadores || []
  console.log(data)
  if (data.hasOwnProperty('autores') && data.hasOwnProperty('identificadores')) {
    agregarAutores(data)
    agregarIdentificadores(data)
  }
  inputs.forEach((item, index) => {
    if (index > 2 && index !== 11 && index !== 12) {
      if (data.hasOwnProperty('tipo_documento') || data.hasOwnProperty('idioma') || data.hasOwnProperty('mes')) {
        item.value = data.hasOwnProperty(item.getAttribute('name')) && data[item.getAttribute('name')]
      } else {
        item.value = data[item.getAttribute('name')] === undefined ? '' : data[item.getAttribute('name')]
      }
    }
  })
})

// Agrega los autores con el refresh de la pagina
const agregarAutores = (array) => {
  if (array.autores.length !== 0) {
    array.autores.forEach((item) => {
      const agregarAutoresP = document.createElement('DIV')
      agregarAutoresP.classList.add('container-autores')
      agregarAutoresP.innerHTML = `<p>
 ${item.nombre} ${item.apellido_paterno} ${item.apellido_materno}</p>  <img class="btn-trash" src="/assets/img/trash.svg" alt="" />
  `
      divAutoresAñadidos.appendChild(agregarAutoresP)

      const btnEliminarAutores = agregarAutoresP.lastElementChild

      // Eliminar autores
      btnEliminarAutores.addEventListener('click', (e) => {
        const div = e.target.parentElement
        divAutoresAñadidos.removeChild(div)
        const autor = e.target.previousElementSibling.innerHTML.slice(2)

        autores = eliminacion(autores, autor, 'nombre', 'apellido_paterno', 'apellido_materno')
      })
    })
  }
}

const agregarIdentificadores = (data) => {
  data.identificadores.map(identificador => {
    const agregarIdentificador = document.createElement('DIV')
    agregarIdentificador.classList.add('container-indentificadores')
    agregarIdentificador.innerHTML = `<p>
    ${identificador.identificador_codigo} ${identificador.identificador_numeros}</p>  <img class="btn-trash" src="/assets/img/trash.svg" alt="" />`
    identifTiposAnadidosPadre.appendChild(agregarIdentificador)

    const btnEliminarIdentificadores = agregarIdentificador.lastElementChild
    btnEliminarIdentificadores.addEventListener('click', (e) => {
      const div = e.target.parentElement
      identifTiposAnadidosPadre.removeChild(div)
      const identificador = e.target.previousElementSibling.innerHTML.slice(5)
      identificadores = eliminacion(identificadores, identificador, 'identificador_codigo', 'identificador_numeros')
    })
  })
}

function eliminacion (array = [], cadena, ...rest) {
  array = array.filter(element => {
    if (element[rest[2]] !== undefined) {
      const comparacionCadena = `${element[rest[0]]} ${element[rest[1]]} ${element[rest[2]]}`

      return cadena !== comparacionCadena
    }
    const comparacionCadena = `${element[rest[0]]} ${element[rest[1]]} ${element[rest[2]]}`
    let formatComparacionCadena = comparacionCadena.replace('undefined', '')
    formatComparacionCadena = formatComparacionCadena.slice(0, -1)
    return cadena !== formatComparacionCadena
  })
  return array
}
const validarFormulario = () => {
  const arrayEvaluar = Array.from(inputs).filter((element, index) => {
    return index > 2 && index !== 6 && index < 12
  })
  const autoresValidar = (autores.length !== 0 || (inputNombre[0].value !== '' && apellidoPaterno[0].value !== '' && apellidoMaterno[0].value !== ''))
  const identificadoresValidar = (identificadores.length !== 0 || identificadorNumeros[0].value !== '')
  if (autoresValidar && identificadoresValidar && arrayEvaluar.every(item => item.value !== '')) {
    obtenerTodosDatos()
    window.location.href = '/nuevo-envio/describir-documento-p2'
  } else {
    Swal.fire({
      icon: 'warning',
      text: 'Hay campos vacios',
      background: '#1b396a',
      color: '#fff'

    })
  }
}

const obtenerTodosDatos = () => {
  if (apellidoPaterno[0].value !== '' && inputNombre[0].value !== '' && apellidoMaterno !== '') {
    autores.push({
      nombre: inputNombre[0].value,
      apellido_paterno: apellidoPaterno[0].value,
      apellido_materno: apellidoMaterno[0].value
    })
  }
  if (identificadorCodigo[0].value !== '' && identificadorNumeros[0].value !== '') {
    identificadores.push({
      identificador_codigo: identificadorCodigo[0].value,
      identificador_numeros: identificadorNumeros[0].value
    })
  }
  inputs.forEach((item, index) => {
    if (index > 2 && index !== 11 && index !== 12) {
      data[item.getAttribute('name')] = item.value
    }
  })
  data.autores = [...autores]
  data.identificadores = [...identificadores]
  localStorage.setItem('json', JSON.stringify(data))
}
