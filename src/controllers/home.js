const { request, response } = require('express')
const { Sequelize } = require('sequelize')
const { Comunidades, Documentos, Colecciones, Autores } = require('../models/index')
const homeRender = async (req = request, res = response) => {
  try {
    const colecciones = await Colecciones.findAll({ limit: 5 })

    const documentos = await Documentos.findAll({ order: [['fecha_publicacion', 'DESC']], limit: 7 })
    const autores = await Autores.findAll({
      attributes: [

        [Sequelize.fn('DISTINCT', Sequelize.col('nombre'), Sequelize.col('apellido_paterno'), Sequelize.col('apellido_materno')), 'nombre']
      ]
    })
    const comunidades = await Comunidades.findAll()
    res.render('home', { style: 'index/index-style.css', comunidades, documentos, colecciones, autores })
  } catch (error) {
    res.redirect('*')
  }
}
module.exports = {
  homeRender
}
