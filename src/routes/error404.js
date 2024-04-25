const { Router } = require('express')
const router = Router()

router.get('/', (req, res) => {
  res.render('error404/error404')
})

module.exports = router
