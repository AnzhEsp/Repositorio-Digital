const { DataTypes } = require('sequelize')
const Comunidades = require('../comunidades/comunidades_modelo')
const configDb = require('../../db/configDB')

const Colecciones = configDb.define('colecciones', {
  id_coleccion: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  nombre: {
    type: DataTypes.TEXT,
    allowNull: false,
    unique: true
  },

  id_comunidad: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: Comunidades,
      key: 'id_comunidad'
    }
  }

}, {
  timestamps: false
}
)

Comunidades.hasMany(Colecciones, { as: 'colecciones', foreignKey: 'id_comunidad' })
Colecciones.belongsTo(Comunidades, { as: 'comunidad', foreignKey: 'id_comunidad' })
module.exports = Colecciones
