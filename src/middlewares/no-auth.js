const { request, response } = require('express')
// Verificacion si no existe login
const notAuth = async (req = request, res = response, next) => {
  console.log(req.isAuthenticated())
  if (req.isAuthenticated()) {
    return res.redirect('/')
  }

  next()
}
module.exports = notAuth
