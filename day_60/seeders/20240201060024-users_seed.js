"use strict";
const bcrypt = require("bcrypt");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const data = [
      {
        name: "admin",
        email: "admin@gmail.com",
        password: bcrypt.hashSync("123456", 10),
        status: true,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: "User 1",
        email: "user1@gmail.com",
        password: bcrypt.hashSync("123456", 10),
        status: true,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: "kid",
        email: "kid309228@gmail.com",
        password: bcrypt.hashSync("123456", 10),
        status: true,
        created_at: new Date(),
        updated_at: new Date(),
      },
    ];

    await queryInterface.bulkInsert("users", data);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("users");
  },
};
