"use strict";
const { Model, INTEGER, Sequelize } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Mail extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Mail.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      from: {
        type: DataTypes.STRING,
      },
      to: {
        type: DataTypes.STRING,
      },
      title: {
        type: DataTypes.STRING,
      },
      description: {
        type: DataTypes.STRING,
      },
      status: {
        type: DataTypes.BOOLEAN,
      },
    },
    {
      sequelize,
      modelName: "Mail",
      //Mặc định Sequelize có sẵn 2 trường: createdAt, updatedAt
      createdAt: "created_at",
      updatedAt: "updated_at",
      //Nếu muốn bỏ 2 trường createdAt và updatedAt --> Khai báo timestamps: false
      // timestamps: false
      tableName: "mails", //Tên table trong DB
    }
  );
  return Mail;
};
