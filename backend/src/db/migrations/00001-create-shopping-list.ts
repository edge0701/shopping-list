import {
    QueryInterface,
    SequelizeStatic,
} from 'sequelize';

export = {
  // tslint:disable-next-line:variable-name
  up: (queryInterface: QueryInterface, Sequelize: SequelizeStatic) => {
    return queryInterface.createTable('shopping_list',
      {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER,
        },

        data: {
          allowNull: false,
          type: Sequelize.JSONB,
        },

        user_id: {
          allowNull: false,
          type: Sequelize.INTEGER,
          references: {
            model: 'user',
            key: 'id',
          },
        },

        created_at: {
          allowNull: false,
          defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
          type: Sequelize.DATE,
        },

        updated_at: {
          allowNull: false,
          defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
          type: Sequelize.DATE,
        },

        deleted_at: {
          type: Sequelize.DATE,
        },
    });
  },

  down: (queryInterface: QueryInterface) => {
    return queryInterface.dropTable('shopping_list');
  },
};
