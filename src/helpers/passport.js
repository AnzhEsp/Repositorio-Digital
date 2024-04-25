const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const bcryptjs = require('bcryptjs')
const { Usuarios } = require('../models/usuarios/usuarios_modelo')

// Guarda el id del usuario logueado
passport.serializeUser((user, done) => {
  done(null, user.uid)
})
// Toma el id serializado y lo busca en la base de datos para guardar la info en el server de manera persistente
passport.deserializeUser(async (id, done) => {
  const user = await Usuarios.findByPk(id)
  done(null, user)
})

// Registrar usuario
passport.use('local-registrar', new LocalStrategy(
  {
    passwordField: 'pass',
    usernameField: 'correo',
    passReqToCallback: true
  }, async (req, correo, pass, done) => {
    const { nombre, apellidoPaterno, apellidoMaterno, telefono, passrepite } = await req.body
    try {
      if (pass !== passrepite) {
        return done(null, false)
      }
      const salt = bcryptjs.genSaltSync()
      const hashContrasena = bcryptjs.hashSync(pass, salt)
      const user = await Usuarios.create({ nombre, apellido_paterno: apellidoPaterno, apellido_materno: apellidoMaterno, correo, telefono, contrasena: hashContrasena })
      done(null, user)
    } catch (error) {
      return done(null, false)
    }
  }))

// Login
passport.use('local-login', new LocalStrategy({
  usernameField: 'correo',
  passwordField: 'pass',
  passReqToCallback: true
}, async (req, correo, pass, done) => {
  const user = await Usuarios.findOne({ where: { correo } })
  if (!user) {
    return done(null, false, req.flash('mensaje', 'Correo/contraseña incorrecta'))
  }
  const validaContrasena = bcryptjs.compareSync(pass, user.contrasena)

  if (!validaContrasena) {
    return done(null, false, req.flash('mensaje', 'Correo/contraseña incorrecta'))
  }
  done(null, user)
}))
