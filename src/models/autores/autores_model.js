
const { DataTypes } = require('sequelize')
const configDb = require('../../db/configDB')

const Autores = configDb.define('autores', {
  id_autor: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  nombre: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  apellido_paterno: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  apellido_materno: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  fullName: {
    type: DataTypes.VIRTUAL,
    get () {
      return `${this.nombre} ${this.apellido_paterno} ${this.apellido_materno}`
    }
  }
  // id_documento_completo: {
  //   type: DataTypes.UUID,
  //   allowNull: false,
  //   references: {
  //     model: DocumentosCompletos,
  //     key: 'id_documento_completo'
  //   }
  // }
}, {
  timestamps: false
})

module.exports = Autores
