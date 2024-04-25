const { request, response } = require('express')
const jwt = require('jsonwebtoken')

const validarToken = async (req = request, res = response, next) => {
  const { id: url } = req.params
  try {
    const id = jwt.verify(url, process.env.TOKENKEY)
    if (!id) {
      req.flash('mensaje', 'No existe el correo')
      return res.redirect('/recuperacion-cuenta')
    }
    req.id = id
    next()
  } catch (error) {
    req.flash('mensaje', 'No existe el correo')
    res.redirect('/recuperacion-cuenta')
  }
}

module.exports = validarToken
