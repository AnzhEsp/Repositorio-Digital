const { Router } = require('express')
const passport = require('passport')
const { registrarUsuarioRender } = require('../controllers/index_controladores')
const { validarEmail } = require('../controllers/registrar-usuario')

const router = Router()
router.get('/', registrarUsuarioRender)

router.post('/usuario', passport.authenticate('local-registrar', {
  successRedirect: '/',
  failureRedirect: '/registrar',
  failureFlash: {
    type: 'mensajito',
    message: 'Hola'
  }
}))
router.post('/validar-correo', validarEmail)
module.exports = router
