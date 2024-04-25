const { Router } = require('express')
const { getColeccionesFK, getAllColecciones } = require('../controllers/colecciones')

const router = Router()

router.get('/:id', getColeccionesFK)
router.get('/coleccion/:id', getAllColecciones)

module.exports = router
