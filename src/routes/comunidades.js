const { Router } = require('express')
const { renderComunidades } = require('../controllers/comunidades')
const router = Router()
router.get('/', renderComunidades)

module.exports = router
