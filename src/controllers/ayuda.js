const { request, response } = require('express')

/*
"La estructura es general en todos los render de tamplates"
controlador para renderizar el template.
objeto style se le pasa los estilos del template.
objto scriptEspecifico es el archivo js para la funcionalidad del propio template
*/
const ayudaRender = async (req = request, res = response) => {
  res.render('ayuda/ayuda', {
    style: 'ayuda/ayuda.css',
    scriptEspecifico: 'ayuda/ayuda.js',
    title: 'Ayuda'
  })
}

module.exports = {
  ayudaRender
}
