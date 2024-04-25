const btnNext = document.querySelector('#next')
const btnBack = document.querySelector('#back')
const primerDescripcion = document.querySelectorAll('.datos-1')
let json = []
const describirDocumento = async () => {
  const primerDiv = document.createElement('DIV')
  primerDiv.classList.add('datos-recopilados-1')
  const segundoDiv = document.createElement('DIV')
  segundoDiv.classList.add('datos-recopilados-2')
  const tercerDiv = document.createElement('DIV')
  tercerDiv.classList.add('datos-recopilados-4')
  primerDiv.innerHTML = primerTeplate(json)
  segundoDiv.innerHTML = segundoTeplate(json)
  tercerDiv.innerHTML = await tercerTeplate()
  primerDescripcion[0].appendChild(primerDiv)
  primerDescripcion[1].appendChild(segundoDiv)
  primerDescripcion[2].appendChild(tercerDiv)
}

const primerTeplate = (archivo) => {
  let autores = ''
  let identificadores = ''
  archivo.autores.map(autor => {
    autores += `<p class="contenido-item">${autor.nombre} ${autor.apellido_paterno} ${autor.apellido_materno}</p>`
  })
  archivo.identificadores.map(identificador => {
    identificadores += `<p class="contenido-item"> ${identificador.identificador_codigo.toUpperCase()}:${identificador.identificador_numeros}</p>`
  })

  const lenguaje = () => {
    if (archivo.idioma === 'ES') {
      return 'Español'
    }
    return archivo.idioma === 'EN' ? 'Ingles' : 'N/A'
  }
  const template = `
<div class="datos-recopilados-1">
          <div class="linea">
            <p class="subtitulos">Autor(es):</p>
            ${autores}
          </div>
          <div class="linea">
            <p class="subtitulos">Título:</p>
            <p class="contenido-item">${archivo.titulo_principal}</p>
          </div>
          <div class="linea">
            <p class="subtitulos">Fecha de emisión:</p>
            <p class="contenido-item">${archivo.dia}-${archivo.mes}-${archivo.anio}</p>
          </div>
          <div class="linea">
            <p class="subtitulos">Serie(s) / Num. Reporte:</p>
            <p class="contenido-item">${archivo.nombre_serie}: ${archivo.numero_informe}</p>
          </div>
          <div class="linea">
            <p class="subtitulos">Identificadores:</p>
            ${identificadores}
            
          </div>
          <div class="linea">
            <p class="subtitulos">Tipo de archivo:</p>
            <p class="contenido-item">PDF</p>
          </div>
          <div class="linea">
            <p class="subtitulos">Tipo de contenido:</p>
            <p class="contenido-item">${archivo.tipo_documento}</p>
          </div>
          <div class="linea">
            <p class="subtitulos">Lenguaje:</p>
            <p class="contenido-item">${lenguaje()}</p>
          </div>
</div>
`
  return template
}
const segundoTeplate = (archivo) => {
  let palabrasClave = ''
  archivo.palabras_clave.forEach(palabra => {
    palabrasClave += `<div class="linea"><p class="contenido-item">${palabra}</p></div>`
  })

  const template = `
            ${palabrasClave}
 
          <div class="linea">
            <p class="subtitulos">Resumen</p>
            <p class="contenido-item">${archivo.resumen}</p>
            </div>
             <div class="linea">
            <p class="subtitulos">Citación</p>
            <p class="contenido-item">${archivo.citacion_p2}</p>
            </div>
`
  return template
}
const tercerTeplate = async () => {
  let nombres = ''
  json.subir.forEach(item => nombres += `<p class="contenido-item">${item.nombre}</p>`)

  const template = `
          
          <div class="linea">
            <p class="subtitulos">Reporte</p>
            ${nombres}
          </div>
`
  return template
}
btnNext.addEventListener('click', () => {
  window.location.href = '/nuevo-envio/licencia'
})
window.addEventListener('load', () => {
  if (!localStorage.getItem('json')) return
  // const data = JSON.parse(localStorage.getItem('json'))
  // data.subir = []
  // localStorage.setItem('json', JSON.stringify(data))
  json = { ...JSON.parse(localStorage.getItem('json')), ...json }
  describirDocumento()
})
btnBack.addEventListener('click', () => {
  window.location.href = '/nuevo-envio/agregar-archivo'
})
