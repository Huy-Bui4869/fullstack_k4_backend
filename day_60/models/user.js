"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      //Thiết lập quan hệ giữa các model.
      User.belongsTo(models.Provider, {
        foreignKey: "provider_id",
        as: "provider",
      });
    }
  }
  User.init(
    {
      //Khai báo các cột trong table
      // https://sequelize.org/docs/v6/core-concepts/model-basics/#data-types
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: DataTypes.STRING,
      },
      email: {
        type: DataTypes.STRING,
      },
      password: {
        type: DataTypes.STRING,
      },
      status: {
        type: DataTypes.BOOLEAN,
      },
      reset_token: {
        type: DataTypes.STRING,
      },
      expired_token: {
        type: DataTypes.STRING,
      },
    },
    {
      //Các options
      sequelize,
      //Tên model
      modelName: "User",

      //Mặc định Sequelize có sẵn 2 trường: createdAt, updatedAt
      createdAt: "created_at",
      updatedAt: "updated_at",
      //Nếu muốn bỏ 2 trường createdAt và updatedAt --> Khai báo timestamps: false
      // timestamps: false

      //Xóa mềm => chuyển trạng thái.
      // paranoid: true,
      // deletedAt: "deleted_at",

      tableName: "users", //Tên table trong DB
    }
  );
  return User;
};
