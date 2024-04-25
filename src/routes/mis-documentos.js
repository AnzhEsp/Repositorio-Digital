const { Router } = require('express')
const { misDocumentosRender } = require('../controllers/index_controladores')
const isAuth = require('../middlewares/isAuth')
const router = Router()

router.get('/', misDocumentosRender)
module.exports = router
