"use strict";

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable("relationships", {
            "requested_id": {
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
            "addressed_id": {
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
            },
            // we wiil use action_performed_id to track who done last status update
            "action_performed_id": {
                type: Sequelize.INTEGER,
                allowNull: false,
            },
            "created_at": {
                allowNull: false,
                type: Sequelize.DATE
            },
            "updated_at": {
                allowNull: false,
                type: Sequelize.DATE
            },
        });
    },
    down: (queryInterface, Sequelize) => {
        return queryInterface.dropTable("relationships");
    }
};
