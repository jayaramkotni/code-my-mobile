"use strict";

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable("relationships", {
            "user_id": {
                type: Sequelize.INTEGER,
                allowNull: false,
                primaryKey: true,
                references: {
                    model: "users",
                    key: "id"
                },
                onUpdate: "cascade",
                onDelete: "cascade"
            },
            "friend_id": {
                type: Sequelize.INTEGER,
                allowNull: false,
                primaryKey: true,
                references: {
                    model: "users",
                    key: "id"
                },
                onUpdate: "cascade",
                onDelete: "cascade"
            },
            "status": {
                type: Sequelize.INTEGER,
                allowNull: false,
            }
        });
    },
    down: (queryInterface, Sequelize) => {
        return queryInterface.dropTable("relationships");
    }
};
