const bcryptjs = require('bcryptjs')
const { response, request } = require('express')

// const { generarJWT } = require('../helpers/generar-jwt')
const { Usuarios } = require('../models/usuarios/usuarios_modelo')
const loginRender = async (req = request, res = response) => {
  if (req.session.activa) {
    return res.redirect('/')
  }
  res.render('login/login', {
    style: 'login/login.css',
    scriptEspecifico: '',
    title: 'Iniciar Sesión',
    errors: req.flash('mensaje')
  })
}

const login = async (req = request, res = response) => {
  const { correo, pass } = req.body
  try {
    const user = await Usuarios.findOne({ where: { correo } })
    if (!user) {
      req.flash('mensaje', 'Correo/contraseña incorrecta')
      return res.redirect('/login')
    }
    const validaContrasena = bcryptjs.compareSync(pass, user.contrasena)

    if (!validaContrasena) {
      req.flash('mensaje', 'Correo/contraseña incorrecta')
      return res.redirect('/login')
    }

    // req.session.user = await user.nombre
    req.session.sig = await user.uid
    req.session.activa = true
    // req.session.active = true
    req.session.usuario = {
      nombre: user.nombre,
      uid: user.uid,
      activa: true
    }

    res.redirect('/')
  } catch (error) {
    console.log(error)
  }
}

module.exports = { loginRender, login }
