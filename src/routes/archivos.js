const { Router } = require('express')
const { subirArchivo, deleteArchivo, verArchivo } = require('../controllers/index_controladores')
const router = Router()
router.get('/visualizar/:id', verArchivo)
router.post('/subir-archivo', subirArchivo)
router.delete('/delete/:id', deleteArchivo)
module.exports = router
