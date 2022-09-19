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
      email: DataTypes.STRING,
      data_nascimento: DataTypes.STRING,
      cpf: DataTypes.STRING,
      telefone: DataTypes.STRING,
      tipo_sanguineo: DataTypes.STRING,
      alergias: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'Cliente',
      tableName: 'clientes',
      paranoid: true,
    },
  );
  return Cliente;
};
