/* eslint-disable max-len */
"use strict";

const { User } = require("../src/models/user");
const { Relationship } = require("../src/models/relationship");

module.exports = {
    up: async (queryInterface, Sequelize) => {
        await User.bulkCreate([
            {
                id: 1,
                first_name: "Akhil",
                last_name: "Akkineni",
                gender: "male",
                avatar: "/assets/images/akhil.jpeg"
            },
            {
                id: 2,
                first_name: "Sachin",
                last_name: "Tendulkar",
                gender: "male",
                avatar: "/assets/images/sachin.png"
            },
            {
                id: 3,
                first_name: "Virat",
                last_name: "Kohli",
                gender: "male",
                avatar: "/assets/images/kohli.jpg"
            },
            {
                id: 4,
                first_name: "Dhoni",
                last_name: "Mahendra Singh",
                gender: "male",
                avatar: "/assets/images/dhoni.jpg"
            },
            {
                id: 5,
                first_name: "Raina",
                last_name: "Suresh",
                gender: "male",
                avatar: "/assets/images/raina.jpg"
            }
        ]);
        const STATUS = Relationship.getStatusCodes();
        // NOTE:To maintain clean data we are inserting 2 entiries for "ACCEPTED" status relationship
        // between to users
        // e.g: if users 1,2 are friends then we insert (1,2) and (2,1)
        await Relationship.bulkCreate([
            {
                user_id: 1,
                friend_id: 2,
                status: STATUS.PENDING,
            },
            {
                user_id: 1,
                friend_id: 3,
                status: STATUS.ACCEPTED,
            },
            {
                user_id: 3,
                friend_id: 1,
                status: STATUS.ACCEPTED,
            },
            {
                user_id: 2,
                friend_id: 3,
                status: STATUS.ACCEPTED,
            },
            {
                user_id: 3,
                friend_id: 2,
                status: STATUS.ACCEPTED,
            },
            {
                user_id: 1,
                friend_id: 4,
                status: STATUS.ACCEPTED,
            },
            {
                user_id: 4,
                friend_id: 1,
                status: STATUS.ACCEPTED,
            },
            {
                user_id: 2,
                friend_id: 4,
                status: STATUS.ACCEPTED,
            },
            {
                user_id: 4,
                friend_id: 2,
                status: STATUS.ACCEPTED,
            },
            {
                user_id: 1,
                friend_id: 5,
                status: STATUS.BLOCKED,
            },
            {
                user_id: 5,
                friend_id: 2,
                status: STATUS.ACCEPTED,
            },
            {
                user_id: 2,
                friend_id: 5,
                status: STATUS.ACCEPTED,
            }
        ]);


    },

    down: async (queryInterface, Sequelize) => {
        await User.destroy({ where: { id: [1, 2, 3, 4, 5] } });
    }
};
