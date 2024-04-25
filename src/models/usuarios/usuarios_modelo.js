const { DataTypes } = require('sequelize')
const configDB = require('../../db/configDB')

const Usuarios = configDB.define('usuarios', {
  uid: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
    allowNull: false
  },
  nombre: {
    type: DataTypes.STRING(50),
    allowNull: false
  },
  apellido_paterno: {
    type: DataTypes.STRING(60),
    allowNull: false
  },
  apellido_materno: {
    type: DataTypes.STRING(60),
    allowNull: false
  },
  telefono: {
    type: DataTypes.STRING(15),
    allowNull: false
  },
  correo: {
    type: DataTypes.STRING(26),
    allowNull: false,
    unique: true
  },
  contrasena: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, {
  timestamps: false
})

module.exports = { Usuarios }
