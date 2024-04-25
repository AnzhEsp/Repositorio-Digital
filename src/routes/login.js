const { Router } = require('express')
const passport = require('passport')
const { loginRender } = require('../controllers/index_controladores')
const notAuth = require('../middlewares/no-auth')
const router = Router()

router.get('/', notAuth, loginRender)

router.post('/auth', passport.authenticate('local-login', {
  successRedirect: '/',
  failureRedirect: '/login',
  failureFlash: true
}))
module.exports = router
