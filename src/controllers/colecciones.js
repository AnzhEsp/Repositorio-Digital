const { request, response } = require('express')
const Colecciones = require('../models/colecciones/colecciones_model')
const Comunidades = require('../models/comunidades/comunidades_modelo')

const getColeccionesFK = async (req = request, res = response) => {
  const id = req.params.id
  try {
    const ress = await Colecciones.findAll({
      include: {
        where: {
          id_comunidad: id
        },
        model: Comunidades,
        as: 'comunidad'

      }
    })
    if (ress.length === 0) throw new Error()
    res.status(200).json(ress)
  } catch (error) {
    res.status(400).json({ msg: 'No hay Colecciones' })
  }
}
const getAllColecciones = async (req = request, res = response) => {
  try {
    const id = req.params.id
    const colecciones = await Colecciones.findByPk(id)
    if (!colecciones) throw new Error()
    res.status(200).json({ state: true })
  } catch (error) {
    res.status(400).json({ state: false })
  }
}
module.exports = {
  getColeccionesFK,
  getAllColecciones
}
