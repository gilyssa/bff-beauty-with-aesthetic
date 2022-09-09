'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Cliente extends Model {
    static associate(models) {
      Cliente.belongsTo(models.Usuario, {
        foreignKey: 'usuario_id',
        as: 'usuario',
      });
    }
  }
  Cliente.init(
    {
      nome: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'Cliente',
      tableName: 'clientes',
    },
  );
  return Cliente;
};
