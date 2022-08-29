'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Procedimento_Ficha_Cliente extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Cliente.belongsTo(models.Procedimento_Cliente, { foreignKey: 'procedimento_cliente_id', as: 'procedimento_cliente'})

    }
  }
  Procedimento_Ficha_Cliente.init({
    nome: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Procedimento_Ficha_Cliente',
    tableName: 'procedimento_ficha_clientes',
  });
  return Procedimento_Ficha_Cliente;
};