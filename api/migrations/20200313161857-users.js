"use strict";

module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable("users", {
            "id": {
                type: Sequelize.INTEGER,
                autoIncrement: true,
                primaryKey: true
            },
            "first_name": {
                type: Sequelize.STRING,
                allowNull: false
            },
            "last_name": {
                type: Sequelize.STRING,
                allowNull: false
            },
            "gender": {
                type: Sequelize.STRING,
                allowNull: false
            },
            "avatar": {
                type: Sequelize.TEXT,
                allowNull: true
            }
        });

    },
    down: async (queryInterface, Sequelize) => {
        await queryInterface.dropTable("users");
    }
};
