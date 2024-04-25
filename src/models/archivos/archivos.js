const { DataTypes } = require('sequelize')

const configDb = require('../../db/configDB')
const { Documentos } = require('../index')
const Archivos = configDb.define('archivos', {

  id_archivo: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    allowNull: false,
    primaryKey: true
  },
  nombre: {
    type: DataTypes.TEXT,
    allowNull: false

  },
  descripcion_archivo: {
    type: DataTypes.TEXT
  },
  motivo_embargo: {
    type: DataTypes.TEXT
  },
  base_data: {
    type: DataTypes.CHAR.BINARY,
    allowNull: false
  },
  id_documento: {
    type: DataTypes.UUID,
    allowNull: true,
    references: {
      model: Documentos,
      key: 'id_documento'
    }
  }

}, {
  timestamps: false
})

module.exports = Archivos
