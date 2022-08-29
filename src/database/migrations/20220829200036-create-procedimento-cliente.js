'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('procedimento_clientes', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      procedimento_id: {
				type: Sequelize.INTEGER,
				allowNull: false,
				references: {
				  model: {
						tableName: 'procedimentos'
					},
					key: 'id'
				}
			},
      cliente_id: {
				type: Sequelize.INTEGER,
				allowNull: false,
				references: {
				  model: {
						tableName: 'clientes',
					},
					key: 'id'
				}
			},
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('procedimento_clientes');
  }
};