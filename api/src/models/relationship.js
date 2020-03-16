
const { sequelize, DataTypes } = require("../db/sequelize");

const Relationship = sequelize.define("relationship", {
    "user_id": {
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
    "friend_id": {
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
    }
}, {
    timestamps: false,
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
