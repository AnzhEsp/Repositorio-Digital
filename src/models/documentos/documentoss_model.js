const { DataTypes } = require('sequelize')
const configDb = require('../../db/configDB')
const Autores = require('../autores/autores_model')
const Colecciones = require('../colecciones/colecciones_model')
const Archivos = require('../archivos/archivos')
const palabrasClaves = require('../palabrasClaves/palabras_claves')
const { Usuarios } = require('../usuarios/usuarios_modelo')

const Documentos = configDb.define('documentos', {
  id_documento: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  titulo: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  fecha_publicacion: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  editor: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  citacion: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  nombre_serie: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  numero_serie: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  identificadores: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  tipo_documento: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  lenguaje: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  resumen: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  fecha_embargo: {
    type: DataTypes.DATE,
    allowNull: false
  },
  id_coleccion: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: Colecciones,
      key: 'id_coleccion'
    }
  },
  uid: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: Usuarios,
      key: 'uid'
    }
  }

}, { timestamps: false })

// RELACION DE DOCUMENTOS --> ARCHIVOS
Documentos.hasMany(Archivos, { as: 'archivos', foreignKey: 'id_documento' })
Archivos.belongsTo(Documentos, { as: 'documentos', foreignKey: 'id_documento' })
// RELACION DE AUTORES --> DOCUMENTOS (M,M)
Autores.belongsToMany(Documentos, { through: 'documentos_completos', foreignKey: 'id_autor' })
Documentos.belongsToMany(Autores, { through: 'documentos_completos', foreignKey: 'id_documento' })
// RELACION DE PALABRAS CLAVES --> DOCUMENTOS (M,M)
palabrasClaves.belongsToMany(Documentos, { as: 'documentos', through: 'documentos_completos', foreignKey: 'id_palabra_clave' })
Documentos.belongsToMany(palabrasClaves, { as: 'palabrasClaves', through: 'documentos_completos', foreignKey: 'id_documento' })
// RELACION DE COLECCIONES --> DOCUMENTOS
Colecciones.hasMany(Documentos, { as: 'documentos', foreignKey: 'id_coleccion' })
Documentos.belongsTo(Colecciones, { as: 'coleccion', foreignKey: 'id_coleccion' })
// RELACION DE Usuarios --> DOCUMENTOS
Usuarios.hasMany(Documentos, { as: 'documentos', foreignKey: 'uid' })
Documentos.belongsTo(Usuarios, { as: 'usuario', foreignKey: 'uid' })

module.exports = Documentos
