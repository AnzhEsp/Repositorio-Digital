const { Router } = require('express')
const { ayudaRender } = require('../controllers/index_controladores')

const router = Router()
router.get('/', ayudaRender)
module.exports = router
