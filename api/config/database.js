require("dotenv").config();
const debug = require("debug")("api:sequelize");
module.exports = {
    dialect: "postgres",
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT || 5432,
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    },
    logging: (msg) => {
        debug(msg);
    },
    seederStorage: "sequelize",
    seederStorageTableName: "sequelize_data",
    migrationStorageTableName: "sequelize_meta",
};
