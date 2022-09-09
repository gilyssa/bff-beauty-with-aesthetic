'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('procedimento_ficha_clientes', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      procedimento_cliente_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: {
            tableName: 'procedimento_clientes',
          },
          key: 'id',
        },
      },
      data_diluicao: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      volume_diluicao: {
        allowNull: false,
        type: Sequelize.FLOAT,
      },
      num_lote: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      data_validade: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      data_aplicacao: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      deletedAt: {
        allowNull: true,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('procedimento_ficha_clientes');
  },
};
