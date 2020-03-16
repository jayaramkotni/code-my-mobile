const { sequelize, DataTypes } = require("../db/sequelize");
const { Relationship } = require("./relationship");
const GENDERS = {
    MALE: "male",
    FEMALE: "female",
    OTHERS: "others"
};

const User = sequelize.define("user", {
    "id": {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    "first_name": {
        type: DataTypes.STRING,
        allowNull: false
    },
    "last_name": {
        type: DataTypes.STRING,
        allowNull: false
    },
    "gender": {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            function(val) {
                if (!Object.values(GENDERS).includes(val)) {
                    let msg = `"${val}" is not a valid gender.`;
                    msg += ` Please use one of ${Object.values(GENDERS)}`;
                    throw new Error(msg);
                }
            }
        },
    },
    "avatar": {
        type: DataTypes.TEXT,
        allowNull: true
    }
}, {
    timestamps: false,
    underscored: true
});

User.hasMany(Relationship, { as: "friends" });
module.exports = { User };
