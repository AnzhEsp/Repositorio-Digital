const { DataTypes } = require('sequelize')
const configDb = require('../../db/configDB')
// const { Colecciones } = require('../index')
const Comunidades = configDb.define('comunidades', {
  id_comunidad: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
    allowNull: false
  },
  nombre: {
    type: DataTypes.STRING(50),
    unique: true,
    allowNull: false
  }
}, {
  timestamps: false
})

module.exports = Comunidades
