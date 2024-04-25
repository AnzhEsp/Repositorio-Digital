const { Router } = require('express')
const { visualizarDocumento } = require('../controllers/documentos')
const router = Router()
router.get('/ver/:id', visualizarDocumento)
module.exports = router
