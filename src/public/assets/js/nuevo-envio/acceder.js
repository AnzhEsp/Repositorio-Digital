const inputDia = document.querySelector('#dia-emision')
const inputMes = document.querySelector('#mes')
const inputAnio = document.querySelector('#anio-emision')
const btnNext = document.querySelector('#next')
const btnBack = document.querySelector('#back')

const inputs = [inputDia, inputMes, inputAnio]
let json = {
  fecha_embargo: {
    [inputDia.getAttribute('name')]: '',
    [inputMes.getAttribute('name')]: inputMes.value,
    [inputAnio.getAttribute('name')]: ''
  }
}

btnNext.addEventListener('click', () => {
  if (inputs.every(element => element.value !== '')) {
    obtenerTodosDatos()
    window.location.href = '/nuevo-envio/agregar-archivo'
  } else {
    Swal.fire({
      icon: 'warning',
      text: 'Hay campos vacios',
      background: '#1b396a',
      color: '#fff'
    })
  }
})
btnBack.addEventListener('click', () => {
  window.location.href = '/nuevo-envio/describir-documento-p2'
})
const obtenerTodosDatos = () => {
  json.fecha_embargo.dia = inputDia.value
  json.fecha_embargo.mes = inputMes.value
  json.fecha_embargo.anio = inputAnio.value
  console.log(inputAnio.value)

  json = { ...JSON.parse(localStorage.getItem('json')), ...json }
  localStorage.setItem('json', JSON.stringify(json))
}

const sanitizadorInputs = () => {
  inputDia.value = ''
  inputAnio.value = ''
}

window.addEventListener('load', () => {
  if (!JSON.parse(localStorage.getItem('json'))) {
    sanitizadorInputs()
    return
  }
  json = { ...json, ...JSON.parse(localStorage.getItem('json')) }

  inputs.forEach(item => item.value = json.fecha_embargo[item.getAttribute('name')])
})
