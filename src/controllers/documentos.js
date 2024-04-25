const { response, request } = require('express')
const { Documentos, Autores, palabrasClaves, Archivos } = require('../models/index')
const visualizarDocumento = async (req = request, res = response) => {
  const { id } = req.params
  try {
    let documento = await Documentos.findByPk(id, { include: [{ model: Autores }, { model: palabrasClaves, as: 'palabrasClaves' }, { model: Archivos, as: 'archivos' }] })
    if (documento === undefined) documento = []

    res.render('documento/visualizar-documento', {
      style: 'documentos/visualizar-archivos.css',
      title: 'Visualizando documento',
      documento,
      id: documento.archivos[0].id_archivo
    })
  } catch (error) {
    res.redirect('/*')
  }
}

module.exports = {
  visualizarDocumento
}
