const { renderP1Describir, renderP2Describir, renderP3Accerder, renderP4SubirArchivo, renderP5Revisar, renderP7Licencia } = require('./nuevo-envio/index-envio')
const { login, loginRender } = require('./login')
const { registrarUsuarioRender } = require('./registrar-usuario')
const { ayudaRender } = require('./ayuda')
const { renderNormatividad } = require('./normatividad')
const { cerrarSesion } = require('./usuario')
const { perfilRender } = require('./perfil')
const { misDocumentosRender } = require('./mis-documentos')
const { homeRender } = require('./home')
const { postArchivo, getArchivo, getDocsCompletos, getDocsUser } = require('./nuevo-envio/subirArchivo')
const { subirArchivo, deleteArchivo, verArchivo } = require('./archivos')
module.exports = {
  renderP1Describir, renderP2Describir, renderP3Accerder, renderP4SubirArchivo, renderP5Revisar, renderP7Licencia, login, loginRender, registrarUsuarioRender, ayudaRender, perfilRender, misDocumentosRender, homeRender, cerrarSesion, postArchivo, getArchivo, subirArchivo, deleteArchivo, getDocsCompletos, getDocsUser, verArchivo, renderNormatividad
}
