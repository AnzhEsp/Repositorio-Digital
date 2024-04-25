const { response } = require('express')
const { request } = require('express')

const cerrarSesion = (req = request, res = response) => {
  req.logout(err => {
    console.log(err)
  })
  res.redirect('/')
}

module.exports = { cerrarSesion }
