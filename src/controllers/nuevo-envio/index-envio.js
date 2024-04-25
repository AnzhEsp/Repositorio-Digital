const { response, request } = require('express')

const renderP1Describir = async (req = request, res = response) => {
  res.render('nuevo-envio/p1-describir-doc', {
    style: 'nuevo-envio/p1-describir-doc.css',

    scriptEspecifico: 'nuevo-envio/p1-describir-docsc.js'
  }
  )
}
const renderP2Describir = async (req = request, res = response) => {
  res.render('nuevo-envio/p2-describir-doc', {
    style: 'nuevo-envio/p2-describir-doc.css',
    scriptEspecifico: 'nuevo-envio/p2-describir-docs.js'

  }
  )
}
const renderP3Accerder = async (req = request, res = response) => {
  res.render('nuevo-envio/p3-acceder', {
    style: 'nuevo-envio/p3-acceder.css',
    scriptEspecifico: 'nuevo-envio/acceder.js'

  }
  )
}
const renderP4SubirArchivo = async (req = request, res = response) => {
  res.render('nuevo-envio/p4-subir-archivo', {
    style: 'nuevo-envio/p4-subir-archivo.css',
    scriptEspecifico: 'nuevo-envio/p4-subir-archivo.js'
  }
  )
}
const renderP5Revisar = async (req = request, res = response) => {
  res.render('nuevo-envio/p5-revisar', {
    style: 'nuevo-envio/p5-revisar.css',
    scriptEspecifico: 'nuevo-envio/p5-revisar.js'

  }
  )
}
const renderP7Licencia = async (req = request, res = response) => {
  res.render('nuevo-envio/p7-licencia', {
    style: 'nuevo-envio/p6-licencia-cc.css',
    scriptEspecifico: 'nuevo-envio/p7-licencia.js'

  }
  )
}

module.exports = {
  renderP1Describir,
  renderP2Describir,
  renderP3Accerder,
  renderP4SubirArchivo,
  renderP5Revisar,
  renderP7Licencia
}
