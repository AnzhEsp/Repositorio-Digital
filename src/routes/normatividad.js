const { Router } = require('express')
const { renderNormatividad } = require('../controllers/index_controladores')
const router = Router()
router.get('/', renderNormatividad)
module.exports = router
