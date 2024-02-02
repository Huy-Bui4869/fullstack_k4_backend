"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("users", {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      name: {
        type: Sequelize.STRING(50),
        allowNull: false, //not null
      },
      email: {
        type: Sequelize.STRING(115),
        allowNull: false, //not null
        unique: true,
      },
      password: {
        type: Sequelize.STRING(225),
        allowNull: false, //not null
      },
      provider_id: {
        type: Sequelize.INTEGER,
        references: {
          model: {
            tableName: "providers",
          },
          key: "id",
        },
      },
      status: {
        type: Sequelize.BOOLEAN,
        // defaultValue: false,
      },
      created_at: {
        type: Sequelize.DATE,
      },
      updated_at: {
        type: Sequelize.DATE,
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("users");
  },
};
