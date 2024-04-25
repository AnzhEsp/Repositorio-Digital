const Archivos = require('./archivos/archivos')
const Autores = require('./autores/autores_model')
const Colecciones = require('./colecciones/colecciones_model')
const Comunidades = require('./comunidades/comunidades_modelo')
const DocumentosCompletos = require('./documentos/documentos_completos')
const Documentos = require('./documentos/documentoss_model')
const palabrasClaves = require('./palabrasClaves/palabras_claves')
const { Usuarios } = require('./usuarios/usuarios_modelo')

module.exports = {
  Archivos,
  Autores,
  Colecciones,
  Comunidades,
  DocumentosCompletos,
  Documentos,
  palabrasClaves,
  Usuarios
}
