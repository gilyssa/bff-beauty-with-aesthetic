'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Procedimento extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Procedimento.belongsTo(models.Usuario, {
        foreignKey: 'usuario_id',
        as: 'usuario',
      });
    }
  }
  Procedimento.init(
    {
      nome: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'Procedimento',
      tableName: 'procedimentos',
      paranoid: true,
    },
  );
  return Procedimento;
};
