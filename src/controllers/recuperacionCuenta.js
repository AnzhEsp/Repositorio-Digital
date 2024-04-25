const { request, response } = require('express')
const bcrypt = require('bcryptjs')
const transporter = require('../helpers/nodemail')
const tokenPassword = require('../helpers/token-password')
const { Usuarios } = require('../models/usuarios/usuarios_modelo')

const formCorreo = async (req = request, res = response) => {
  try {
    res.render('restablecer-contrasena/form-correo',
      {
        style: 'recuperar-contrasena/ingresa-email.css',
        title: 'Recuperar cuenta',
        mensaje: req.flash('mensaje')
      })
  } catch (error) {
    res.redirect('*')
  }
}
const sendEmail = async (req = request, res = response) => {
  try {
    const { correo } = req.body
    const user = await Usuarios.findOne({ where: { correo } })
    if (!user) {
      req.flash('mensaje', 'No existe el correo')
      return res.redirect('/recuperacion-cuenta')
    }
    const token = await tokenPassword(user.uid)

    await transporter.sendMail({
      from: 'noreplay_repositorio@cuautla.tecnm.mx', // sender address
      to: user.correo, // list of receivers
      subject: 'Recuperación de contraseña', // Subject line
      html: `<p>Hola.<br>
Siga este enlace para restablecer la contraseña</p>
<a>localhost:3003/recuperacion-cuenta/${token}</a>
    `
    })
    req.flash('mensaje', correo)
    res.redirect('/recuperacion-cuenta/correo-enviado')
  } catch (error) {
    res.redirect('/recuperacion-cuenta')
  }
}

const recuperacionCuenta = async (req = request, res = response) => {
  try {
    res.render('restablecer-contrasena/restablecer-cuenta',
      {
        style: 'recuperar-contrasena/sendmail.css',
        title: 'Correo enviado',
        mensaje: req.flash('mensaje')
      })
  } catch (error) {
    res.redirect('*')
  }
}

const formRestablecer = async (req = request, res = response) => {
  try {
    res.render('restablecer-contrasena/form-restablecer', {
      style: 'recuperar-contrasena/form-send.css',
      title: 'Recuperar Contraseña',
      id: req.id
    })
  } catch (error) {
    res.redirect('*')
  }
}
const sendForm = async (req = request, res = response) => {
  const id = req.params.id

  try {
    const { pass, repitePass } = req.body
    if (pass !== repitePass) {
      return res.redirect('/recuperacion-cuenta')
    }
    const salt = bcrypt.genSaltSync()
    const contrasena = bcrypt.hashSync(pass, salt)
    const user = await Usuarios.update({ contrasena }, {
      where: { uid: id }
    })

    if (!user) {
      return res.redirect('/recuperacion-cuenta')
    }
    res.redirect('/login')
  } catch (error) {

  }
}

module.exports = {
  recuperacionCuenta,
  formRestablecer,
  formCorreo,
  sendEmail,
  sendForm
}
