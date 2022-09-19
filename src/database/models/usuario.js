'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Usuario extends Model {
    static associate(models) {}
  }
  Usuario.init(
    {
      nome: DataTypes.STRING,
      email: DataTypes.STRING,
      senha: DataTypes.STRING,
      codigo: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: 'Usuario',
      tableName: 'usuarios',
      paranoid: true,
    },
  );
  return Usuario;
};
