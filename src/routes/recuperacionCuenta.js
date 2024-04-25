const { Router } = require('express')
const { recuperacionCuenta, formRestablecer, formCorreo, sendEmail, sendForm } = require('../controllers/recuperacionCuenta')
const validarToken = require('../middlewares/verificarTokenPassword')
const router = Router()

router.get('/', formCorreo)
router.post('/correo-enviado', sendEmail)
router.get('/correo-enviado', recuperacionCuenta)
router.post('/send-form/:id', sendForm)
router.get('/:id', validarToken, formRestablecer)

module.exports = router
