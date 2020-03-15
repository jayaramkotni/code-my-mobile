const database = require("../../config/database");
const Sequelize = require("sequelize");

let sequelize = new Sequelize(database);
module.exports = { sequelize, DataTypes: Sequelize.DataTypes };
