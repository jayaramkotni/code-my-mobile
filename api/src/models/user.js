const { sequelize, DataTypes } = require("../db/sequelize");
const { Relationship } = require("./relationship");
const GENDERS = {
    MALE: "male",
    FEMALE: "female",
    OTHERS: "others"
};
// const { translator } = require("./../global/i18n");

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
    timestamps: true,
    underscored: true
});

// User.hasMany(Relationship, {
//     foreignKey: "requested_id",
//     otherKey: "addressed_id",
//     as: "relations"
// });
User.belongsToMany(User, {
    through: Relationship,
    foreignKey: "requested_id",
    otherKey: "addressed_id",
    as: "relations"
});
module.exports = { User };
