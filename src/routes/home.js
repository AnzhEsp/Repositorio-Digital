const { Router } = require('express')
const { homeRender } = require('../controllers/index_controladores')
const isAuth = require('../middlewares/isAuth')

const router = Router()

router.get('/', homeRender)

module.exports = router
