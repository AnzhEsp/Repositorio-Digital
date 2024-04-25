// Importamos la configuracion del servidor
const Server = require('./models/server')
// requerimos el paquete dotenv para poder usar las varibles de entorno
require('dotenv').config()
// Instanciamos la clase para poder usar sus objetos
const server = new Server()

// Inicializamos el servidor
server.listen()
