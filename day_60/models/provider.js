"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Provider extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      //Thiết lập quan hệ giữa các model.
      Provider.hasMany(models.User, {
        foreignKey: "provider_id",
        as: "users",
      });
    }
  }
  Provider.init(
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
    },
    {
      sequelize,
      modelName: "Provider",

      //Mặc định Sequelize có sẵn 2 trường: createdAt, updatedAt
      createdAt: "created_at",
      updatedAt: "updated_at",
      //Nếu muốn bỏ 2 trường createdAt và updatedAt --> Khai báo timestamps: false
      // timestamps: false

      //Xóa mềm => chuyển trạng thái.
      // paranoid: true,
      // deletedAt: "deleted_at",

      tableName: "providers", //Tên table trong DB
    }
  );
  return Provider;
};
