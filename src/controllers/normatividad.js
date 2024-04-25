const { request, response } = require('express')

const renderNormatividad = (req = request, res = response) => {
  try {
    res.render('normatividad/normatividad', {
      style: 'normatividad/normatividad-style.css',
      title: 'Normatividad'
    })
  } catch (error) {
    res.redirect('*')
  }
}

module.exports = { renderNormatividad }
