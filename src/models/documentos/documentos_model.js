const { DataTypes } = require('sequelize')
const configDb = require('../../db/configDB')
const Comunidades = require('../comunidades/comunidades_modelo')
const { Usuarios } = require('../usuarios/usuarios_modelo')

const Documentos = configDb.define('documentos', {

  id_documento: {
    type: DataTypes.UUID,
    primaryKey: true,
    defaultValue: DataTypes.UUIDV4
  },
  titulo: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  autores: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  asesores: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  fecha_publicacion: {
    type: DataTypes.DATE,
    allowNull: false
  },
  tecnologico_proce: {
    type: DataTypes.STRING(50),
    allowNull: false
  },
  tipo_documento: {
    type: DataTypes.STRING(50),
    primaryKey: true,
    allowNull: false
  },
  id_comunidad: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: Comunidades,
      key: 'id_comunidad'
    }
  },
  uid_usuario: {
    type: DataTypes.UUID,
    allowNull: false,
    //! referencia del modelo
    references: {
      model: Usuarios,
      key: 'uid'
    }
  }

}, {
  timestamps: false
})
// ! modelo que tiene las fk + el tipo de relacion(la referencia del modelo, fk campo que va a contener la pk)
Documentos.belongsTo(Usuarios, { foreignKey: 'uid_usuario' })
Documentos.belongsTo(Comunidades, { foreignKey: 'id_comunidad' })

module.exports = Documentos
