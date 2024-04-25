const express = require('express')
const flash = require('connect-flash')
const cors = require('cors')
const handlebars = require('express-handlebars')
const session = require('express-session')
const passport = require('passport')
const path = require('path')

// HELPERS HANDLEBARS
const { compararCadenas, templateMenuUser, templateDocumentos, viewDocumento, HomeBusquedasRelacionadas, parseBuffer, comunidades } = require('../views/helpers-hbs/helpers')
const configDb = require('../db/configDB')
require('../helpers/passport')
class Server {
  constructor () {
    this.app = express()
    this.port = process.env.PORT || 3003

    // Las paths para nuestras rutas
    this.paths = {
      comunidad: '/comunidades',
      ayuda: '/ayuda',
      normatividad: '/normatividad',
      archivos: '/archivo',
      inicio: '/',
      login: '/login',
      documentos: '/documentos',
      registrar: '/registrar',
      usuario: '/usuario',
      perfil: '/mi-perfil',
      misDocumentos: '/mis-documentos',
      nuevoEnvio: '/nuevo-envio',
      colecciones: '/colecciones',
      recuperacion: '/recuperacion-cuenta',
      error404: '*'

    }
    // Conecion de base de datos
    this.conexionDb()
    // moddlewares
    this.middlewares()
    this.routes()
    // rutas de la app
  }

  middlewares () {
    // Se agrega el directorio de vistas
    this.app.set('views', path.join(__dirname, '../views'))

    // Configuracion de del motor handlebars
    this.app.engine('.hbs', handlebars({

      extname: '.hbs', // Extensiones de los archivos para handlebars
      layoutsDir: path.join(this.app.get('views'), 'layouts'), // Directorio principal de layouts
      partialsDir: path.join(this.app.get('views'), 'partials'), //  html reutilizables en el proyecto
      defaultLayout: 'main', // Archivo principal para las vistas
      helpers: { compararCadenas, templateMenuUser, templateDocumentos, viewDocumento, HomeBusquedasRelacionadas, parseBuffer, comunidades },
      runtimeOptions: {
        allowProtoPropertiesByDefault: true,
        allowProtoMethodsByDefault: true
      }
    }))

    // engine hbs (handlebars)
    this.app.set('view engine', '.hbs')
    // cors
    this.app.use(cors())
    // lectura y parse del body
    this.app.use(express.json({ limit: '100mb' }))
    // Analiza las requests entrantes con cargas útiles codificadas en urlencoded
    this.app.use(express.urlencoded({ extended: false }))

    // directorio publico
    this.app.use(express.static(path.join(__dirname, '../public/')))
    // Configuracion de sesiones
    this.app.use(session({
      secret: 'R3p0S1T0C0k13',
      resave: false,
      saveUninitialized: false
    }))
    // configuracion de mensjaes de errores para la plantilla
    this.app.use(flash())
    // Configuracion de passport
    this.app.use(passport.initialize())
    this.app.use(passport.session())
    // Configuracion global para el uso de req.user
    this.app.use((req, res, next) => {
      this.app.locals.user = req.user
      this.app.locals.id = req.id
      next()
    })
  }

  // CONEXION A LA BASE DE DATOS
  async conexionDb () {
    try {
      await configDb.authenticate()
      console.log('DB online')
    } catch (error) {
      console.log(error)
    }
  }

  // RUTAS
  routes () {
    this.app.use(this.paths.inicio, require('../routes/home'))
    this.app.use(this.paths.login, require('../routes/login'))
    this.app.use(this.paths.archivos, require('../routes/archivos'))
    this.app.use(this.paths.documentos, require('../routes/documentos'))
    this.app.use(this.paths.registrar, require('../routes/registrar-usuario'))
    this.app.use(this.paths.usuario, require('../routes/usuario'))
    this.app.use(this.paths.perfil, require('../routes/perfil'))
    this.app.use(this.paths.misDocumentos, require('../routes/mis-documentos'))
    this.app.use(this.paths.ayuda, require('../routes/ayuda'))
    this.app.use(this.paths.nuevoEnvio, require('../routes/nuevo-envio'))
    this.app.use(this.paths.colecciones, require('../routes/colecciones'))
    this.app.use(this.paths.comunidad, require('../routes/comunidades'))
    this.app.use(this.paths.recuperacion, require('../routes/recuperacionCuenta'))
    this.app.use(this.paths.normatividad, require('../routes/normatividad'))
    this.app.use(this.paths.error404, require('../routes/error404'))
  }

  // LISTAR EL SERVIDOR
  listen () {
    this.app.listen(this.port, () => {
      console.log(`Servidor en el puerto: ${this.port}`)
    })
  }
}

module.exports = Server
