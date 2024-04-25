const { request, response } = require('express')

// Verificacion si tiene login para rutas protegidas
const isAuth = async (req = request, res = response, next) => {
  if (req.isAuthenticated()) {
    return next()
  }

  res.redirect('/')
}
module.exports = isAuth
