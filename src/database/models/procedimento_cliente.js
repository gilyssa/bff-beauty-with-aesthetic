'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Procedimento_Cliente extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Procedimento_Cliente.belongsTo(models.Procedimento, { foreignKey: 'procedimento_id', as: 'procedimento'}),
      Procedimento_Cliente.belongsTo(models.Cliente, { foreignKey: 'cliente_id', as: 'cliente'})


    }
  }
  Procedimento_Cliente.init({
    nome: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Procedimento_Cliente',
    tableName: 'procedimento_clientes',
  });
  return Procedimento_Cliente;
};