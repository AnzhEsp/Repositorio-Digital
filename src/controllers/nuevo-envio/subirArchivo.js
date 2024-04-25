const { request, response } = require('express')

const { Documentos, Archivos, palabrasClaves, Autores, DocumentosCompletos, Colecciones, Usuarios } = require('../../models/index')

const postArchivo = async (req = request, res = response) => {
  const { autores, titulo_principal: titulo, dia, mes, anio, editor, citacion, nombre_serie: nombreSerie, numero_informe: numeroSerie, identificadores, tipo_documento: tipoDocumento, idioma: lenguaje, palabras_clave: palabrasClave, resumen, fecha_embargo: embargo, coleccion, subir } = req.body
  const uid = req.user.uid
  try {
    const fechaPublicacion = `${anio}-${mes}-${dia}`
    let add = identificadores.map(identificador => `${identificador.identificador_codigo}-${identificador.identificador_numeros}`)
    add = add.join(',')
    const formatFechaembargo = ` ${embargo.anio} ${embargo.mes} ${embargo.dia}`
    // Insertar los datos a la tabla Documentos
    const resDocumento = await Documentos.create({
      titulo,
      fecha_publicacion: fechaPublicacion,
      editor,
      citacion,
      nombre_serie: nombreSerie,
      numero_serie: numeroSerie,
      identificadores: add,
      tipo_documento: tipoDocumento,
      lenguaje,
      resumen,
      fecha_embargo: formatFechaembargo,
      id_coleccion: coleccion,
      uid
    })
    const { id_documento } = resDocumento

    const resUpdate = await subir.map(async (item) => {
      const resArchivo = await Archivos.update({ id_documento }, {
        where: {
          id_archivo: item.id
        }
      })
      return resArchivo
    })
    // Insetar los datos en la tabla autores
    const resAutor = await Autores.bulkCreate(autores)

    // Insertar los datos en la tabla Palabras Claves
    const resPalabrasClaves = await palabrasClaves.bulkCreate(palabrasClave)
    // Insertar Documento_completo
    const formatBulkCreate = []
    resPalabrasClaves.forEach((itemPalabra) => {
      resAutor.forEach((itemAutor) => {
        const formatBulk = {
          estado: true,
          id_documento,
          id_palabra_clave: itemPalabra.id_palabra_clave,
          id_autor: itemAutor.id_autor
        }
        formatBulkCreate.push(formatBulk)
      })
    })

    const resDocCompletoArray = await DocumentosCompletos.bulkCreate(formatBulkCreate)

    res.json({ resDocumento, resAutor, resPalabrasClaves, resUpdate, resDocCompletoArray })
  } catch (error) {
    console.log(error)
  }
}
const getArchivo = async (req = request, res = response) => {
  const resArchivo = await Archivos.findOne({ where: { nombre: 'ANZUREZ ESPINO ALDAIR Cronograma.pdf' } })

  const data = resArchivo.base_data.toString('base64')
  // const decodedBase64 = base64.base64Decode(data, 'aldair')
  // console.log(decodedBase64)
  res.json(data)
}

const getDocsCompletos = async (req = request, res = response) => {
  try {
    const ress = await Documentos.findAll({
      include: [
        { as: 'coleccion', model: Colecciones },
        { model: Autores },
        { model: Archivos, as: 'archivos' },
        { model: palabrasClaves, as: 'palabrasClaves' }, {
          model: Usuarios, as: 'usuario'
        }]
    })
    res.json(ress)
  } catch (error) {
    console.log(error)
  }
}

const getDocsUser = async (req = request, res = response) => {
  const uid = 'ead56408-bbd8-4561-b3c0-39d9f74643e0'
  // const uid = '888922cd-94f7-46a2-bbd0-387afcd796f3'
  try {
    const ress = await Usuarios.findAll({
      include:
        { model: Documentos, as: 'documentos', where: { uid }, include: [{ model: Colecciones, as: 'coleccion' }] }
    })
    res.json(ress)
  } catch (error) {
    console.log(error)
  }
}
module.exports = {
  getArchivo,
  postArchivo,
  getDocsCompletos,
  getDocsUser
}
