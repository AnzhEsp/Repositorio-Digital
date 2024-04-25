const { response } = require('express')
const { request } = require('express')
const { Usuarios, Documentos, Colecciones, Comunidades } = require('../models/index')

const misDocumentosRender = async (req = request, res = response) => {
  // const uid = 'ead56408-bad8-4561-b3c0-39d9f74643e0'
  // const uid = 'ead56408-bbd8-4561-b3c0-39d9f74643e0'
  const uid = req.user.uid
  try {
    const comunidades = await Comunidades.findAll()
    const [resUser] = await Usuarios.findAll({
      include:
        { model: Documentos, as: 'documentos', where: { uid }, include: [{ model: Colecciones, as: 'coleccion' }] }
    })

    const documentos = resUser === undefined ? [] : resUser.documentos
    res.render('mis-documentos/mis-documentos', {
      style: 'mis-documentos/mis-documentos.css',
      title: 'Mis documentos',
      scriptEspecifico: 'mis-documentos/mis-documentos.js',
      documentos,
      comunidades
    })
  } catch (error) {
    res.render('*')
  }
}

module.exports = {
  misDocumentosRender
}
