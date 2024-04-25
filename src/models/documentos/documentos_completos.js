const { DataTypes } = require('sequelize')
const configDb = require('../../db/configDB')
const { Documentos, palabrasClaves, Autores } = require('../index')
const DocumentosCompletos = configDb.define('documentos_completos', {
  id_documento_completo: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  estado: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
  id_documento: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: Documentos,
      key: 'id_documento'
    }
  },
  id_palabra_clave: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: palabrasClaves,
      key: 'id_palabra_clave'
    }
  },
  id_autor: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: Autores,
      key: 'id_autor'
    }
  }
}, {
  createdAt: false,

  // I want updatedAt to actually be called updateTimestamp
  updatedAt: false
})

module.exports = DocumentosCompletos
