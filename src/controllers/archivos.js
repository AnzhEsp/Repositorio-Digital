const { request, response } = require('express')
const { Archivos } = require('../models/index')
const subirArchivo = async (req = request, res = response) => {
  const [...archivos] = req.body

  try {
    const data = await Archivos.bulkCreate(archivos)
    const idArchivos = data.map(item => {
      return {
        id_archivo: item.id_archivo,
        nombre: item.nombre
      }
    })

    res.status(200).json({ msg: 'Archivo(s) guardado', estado: true, idArchivos })
  } catch (error) {
    res.status(400).json({ msg: 'Envio fallido', estado: false })
  }
}

const deleteArchivo = async (req = request, res = response) => {
  const { id } = req.params
  try {
    const resArchivo = await Archivos.destroy({ where: { id_archivo: id } })
    res.status(200).json({ resArchivo, estado: true })
  } catch (error) {
    console.log(error)
    res.status(400).json({ msg: 'Hubo un error', estado: false })
  }
}

const verArchivo = async (req = request, res = response) => {
  const id = req.params.id

  try {
    const { base_data } = await Archivos.findByPk(id)
    res.render('archivos/pdf-render', {
      style: 'archivos/pdf-render.css',
      title: 'Visualizando documento',
      buffer: JSON.stringify(base_data)
    })
  } catch (error) {
    res.redirect('/*')
  }
}
module.exports = {
  subirArchivo,
  deleteArchivo,
  verArchivo
}
