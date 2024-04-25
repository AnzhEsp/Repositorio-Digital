const { response, request } = require('express')
const Colecciones = require('../models/colecciones/colecciones_model')
const Comunidades = require('../models/comunidades/comunidades_modelo')

const renderComunidades = async (req = request, res = response) => {
  try {
    const comunidades = await Comunidades.findAll({ include: { model: Colecciones, as: 'colecciones' } })
    res.render('comunidades/comunidades', {
      style: 'comunidades/comunidades-style.css',
      title: 'Comunidades',
      comunidades
    })
  } catch (error) {
    res.redirect('*')
  }
}

module.exports = { renderComunidades }
