const { response, request } = require('express')

const perfilRender = async (req = request, res = response) => {
  res.render('perfil/perfil', {
    style: 'perfil/perfil-style.css',
    title: 'Mi perfil'
  })
}
module.exports = {
  perfilRender

}
