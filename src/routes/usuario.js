const { Router } = require('express')
const { cerrarSesion } = require('../controllers/index_controladores')
const router = Router()
router.get('/cerrar-sesion', cerrarSesion)
module.exports = router
