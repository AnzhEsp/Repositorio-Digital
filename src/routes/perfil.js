const { Router } = require('express')
const { perfilRender } = require('../controllers/index_controladores')
const isAuth = require('../middlewares/isAuth')
const router = Router()
router.get('/', isAuth, perfilRender)

module.exports = router
