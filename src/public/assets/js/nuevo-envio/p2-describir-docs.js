const btnNext = document.querySelector('#next')
const btnBack = document.querySelector('#back')
const textResumen = document.querySelector('.text-resumen')
const textcitacion = document.querySelector('.text-citacion')
const inputClave = document.querySelector('.input__clave')
const btnAgregarPalabras = document.querySelector('.btn')
const divPadrePalabras = document.querySelector('.palabras-clave-anadidas')
let data = {}
let palabrasClave = []

const agregarPalabras = (clase, info) => {
  if (info !== '') {
    const divAgregar = document.createElement('DIV')
    divAgregar.classList.add(clase)
    divAgregar.innerHTML = `<p>${info}</p><img class="btn-trash" src="/assets/img/trash.svg" alt="" />`
    divPadrePalabras.appendChild(divAgregar)

    palabrasClave.push(info)
    const handleEliminar = divAgregar.lastElementChild
    handleEliminar.addEventListener('click', (e) => {
      const divPalabraRemove = e.target.parentElement
      divPadrePalabras.removeChild(divPalabraRemove)
      const palabra = e.target.previousElementSibling.innerHTML
      palabrasClave = palabrasClave.filter(element => {
        return palabra !== element
      })
    })
  }
}

const agregarTextInputs = (jsonText) => {
  if (textResumen.getAttribute('name') !== '' && textcitacion.getAttribute('name') !== '') {
    textResumen.value = jsonText[textResumen.getAttribute('name')]
    textcitacion.value = jsonText[textcitacion.getAttribute('name')]
  }
}

window.addEventListener('load', () => {
  if (!localStorage.getItem('json')) {
    sanitizadorInputs()
    return
  }
  data = JSON.parse(localStorage.getItem('json'))
  console.log(data)
  const comprobacionPropiedades = comprobarPropiedadExist(data)

  if (!comprobacionPropiedades.every(item => item === true)) return

  const dataPalabrasclave = data.palabras_clave

  if (dataPalabrasclave.length !== 0) {
    dataPalabrasclave.forEach(index => agregarPalabras('contenedor-palabra', index))
  }
  agregarTextInputs(data)
})

btnAgregarPalabras.addEventListener('click', () => {
  agregarPalabras('contendor-palabra', inputClave.value)
  inputClave.value = ''
})
btnNext.addEventListener('click', () => {
  if (inputClave.value !== '') palabrasClave.push(inputClave.value)

  data[textResumen.getAttribute('name')] = textResumen.value
  data[textcitacion.getAttribute('name')] = textcitacion.value
  data.palabras_clave = palabrasClave
  localStorage.setItem('json', JSON.stringify(data))
  window.location.href = '/nuevo-envio/acceder'
})

const sanitizadorInputs = () => {
  textResumen.value = ''
  textcitacion.value = ''
  inputClave.value = ''
}

const comprobarPropiedadExist = (objeto) => {
  const jsonEvaluar = ['citacion_p2', 'resumen', 'palabras_clave']
  const array = jsonEvaluar.map(item => {
    return Object.hasOwnProperty.call(objeto, item)
  })
  return array
}

btnBack.addEventListener('click', () => {
  window.location.href = '/nuevo-envio/describir-documento'
})
