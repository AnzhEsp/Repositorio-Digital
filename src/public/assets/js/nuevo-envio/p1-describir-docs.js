const inputs = document.querySelectorAll('.input_desc')
const btnNext = document.querySelector('#next')
// variables de autores
const divAutoresAñadidos = document.querySelector('.autores-añadidos')
const btnAgregarAutor = document.querySelector('.img-agregar-autor')
const inputNombre = document.getElementsByName('nombre')
const inputApellidos = document.getElementsByName('apellidos')

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
let data = {
  palabras_clave: [],
  autores: [],
  identificadores: []

}
// Agregar autores
btnAgregarAutor.addEventListener('click', () => {
  if (inputApellidos[0].value !== '' && inputNombre[0].value !== '') {
    autores.push({
      nombre: inputNombre[0].value,
      apellidos: inputApellidos[0].value
    })

    const agregarAutoresP = document.createElement('DIV')
    agregarAutoresP.classList.add('container-autores')
    agregarAutoresP.innerHTML = `<p>
 ${inputNombre[0].value} ${inputApellidos[0].value}</p>  <img class="btn-trash" src="/assets/img/trash.svg" alt="" />
  `
    divAutoresAñadidos.appendChild(agregarAutoresP)
    inputApellidos[0].value = ''
    inputNombre[0].value = ''
    const btnEliminarAutores = agregarAutoresP.lastElementChild
    // Eliminar autores
    btnEliminarAutores.addEventListener('click', (e) => {
      const div = e.target.parentElement
      divAutoresAñadidos.removeChild(div)
    })
  }
})

// Agregar identificadores del articulo
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

// Guardar los datos el localStorage
btnNext.addEventListener('click', () => {
  validarFormulario()
})

// Agregar la informacion antes guardada en la pagina
window.addEventListener('load', () => {
  inputApellidos[0].value = ''
  inputNombre[0].value = ''
  if (!localStorage.getItem('json')) {
    inputs.forEach((item, index) => {
      if (index !== 5 && index !== 11 && index !== 13 && index !== 14) {
        item.value = ''
      }
    })
    return
  }
  data = { ...data, ...JSON.parse(localStorage.getItem('json')) }
  autores = data.autores

  identificadores = data.identificadores
  agregarAutores(data)
  agregarIdentificadores(data)
  inputs.forEach((item, index) => {
    if (index > 1 && index !== 5 && index !== 11 && index < 13) {
      item.value = data[item.getAttribute('name')] === undefined ? '' : data[item.getAttribute('name')]
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
 ${item.nombre} ${item.apellidos}</p>  <img class="btn-trash" src="/assets/img/trash.svg" alt="" />
  `
      divAutoresAñadidos.appendChild(agregarAutoresP)

      const btnEliminarAutores = agregarAutoresP.lastElementChild

      // Eliminar autores
      btnEliminarAutores.addEventListener('click', (e) => {
        const div = e.target.parentElement
        divAutoresAñadidos.removeChild(div)
        const autor = e.target.previousElementSibling.innerHTML.slice(2)
        autores = eliminacion(autores, autor, 'nombre', 'apellidos')
      })
    })
  }
}
// Elimina el autor seleccionado del array autores en cual se almacena el json data

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
    const comparacionCadena = `${element[rest[0]]} ${element[rest[1]]}`
    return cadena !== comparacionCadena
  })
  return array
}

const validarFormulario = () => {
  const arrayEvaluar = Array.from(inputs).filter((element, index) => {
    return index > 1 && index !== 5 && index < 11
  })
  const autoresValidar = (autores.length !== 0 || (inputNombre[0].value !== '' && inputApellidos[0].value !== ''))
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
  if (inputApellidos[0].value !== '' && inputNombre[0].value !== '') {
    autores.push({
      nombre: inputNombre[0].value,
      apellidos: inputApellidos[0].value
    })
  }
  if (identificadorNumeros[0].value !== '') {
    identificadores.push({
      identificador_codigo: identificadorCodigo[0].value,
      identificador_numeros: identificadorNumeros[0].value
    })
  }
  inputs.forEach((item) => {
    if (item.getAttribute('name') !== 'nombre' && item.getAttribute('name') !== 'apellidos' && item.getAttribute('name') !== 'identificador_codigo' && item.getAttribute('name') !== 'identificador_numeros') {
      data[item.getAttribute('name')] = item.value
    }
  })

  data.autores = [...autores]
  data.identificadores = [...identificadores]
  localStorage.setItem('json', JSON.stringify(data))
}
