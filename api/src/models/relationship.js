
const { sequelize, DataTypes } = require("../db/sequelize");

const Relationship = sequelize.define("relationship", {
    "requested_id": {
        type: DataTypes.INTEGER,
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
        type: DataTypes.INTEGER,
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
        type: DataTypes.INTEGER,
        allowNull: false,
        // To validate status code
        validate: function (value) {
            let codes = Relationship.getStatusCodes();
            if (!Object.values(codes).includes(value)) {
                throw new Error("Invalid status code");
            }
        }
    },
    // we wiil use action_performed_id to track who done last status update
    "action_performed_id": {
        type: DataTypes.INTEGER,
        allowNull: false,
    }
}, {
    timestamps: true,
    underscored: true
});

Relationship.getStatusCodes = function () {
    return {
        "PENDING": 1,
        "ACCEPTED": 2,
        "DECLINED": 3,
        "BLOCKED": 4,
    };
};

module.exports = { Relationship };
