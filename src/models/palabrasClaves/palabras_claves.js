
const { DataTypes } = require('sequelize')
const configDb = require('../../db/configDB')

const palabrasClaves = configDb.define('palabras_claves', {
  id_palabra_clave: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  nombre: {
    type: DataTypes.TEXT,
    allowNull: false
  }
}, {
  timestamps: false
})

module.exports = palabrasClaves
