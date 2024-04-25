
const { response, request } = require('express')
const { Usuarios } = require('../models/usuarios/usuarios_modelo')
const registrarUsuarioRender = (req = request, res = response) => {
  res.render('registrar/registrar-usuario.hbs', { style: 'registrar-usuario/registrar-nuevo-usuario-style.css', scriptEspecifico: 'registrar-usuario/registrarUsuario.js', title: 'Registrar usuario' })
}

const validarEmail = async (req = request, res = response) => {
  const { correo } = req.body

  const emailExist = await Usuarios.findOne({ where: { correo } })

  emailExist ? res.json({ msg: 'El correo ya esta registrado', estado: false }) : res.json({ estado: true })
}

module.exports = {
  registrarUsuarioRender,
  validarEmail
}
