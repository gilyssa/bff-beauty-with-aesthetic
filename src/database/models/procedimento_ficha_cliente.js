'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Procedimento_Ficha_Cliente extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Procedimento_Ficha_Cliente.belongsTo(models.Procedimento_Cliente, {
        foreignKey: 'procedimento_cliente_id',
        as: 'procedimento_cliente',
      });
    }
  }
  Procedimento_Ficha_Cliente.init(
    {
      data_diluicao: DataTypes.DATE,
      volume_diluicao: DataTypes.FLOAT,
      num_lote: DataTypes.STRING,
      data_validade: DataTypes.DATE,
      data_aplicacao: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: 'Procedimento_Ficha_Cliente',
      tableName: 'procedimento_ficha_clientes',
    },
  );
  return Procedimento_Ficha_Cliente;
};
