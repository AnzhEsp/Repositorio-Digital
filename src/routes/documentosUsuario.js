const { Router } = require('express')
const { obtenerDocumentosUsuarios } = require('../controllers/documentosUsuarios')

const router = Router()
router.post('/', obtenerDocumentosUsuarios)
module.exports = router
