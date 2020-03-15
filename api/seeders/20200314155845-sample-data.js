"use strict";
const { User } = require("../src/models/user");
const { Relationship } = require("../src/models/relationship");

module.exports = {
    up: async (queryInterface, Sequelize) => {
        await User.bulkCreate([
            {
                id: 1,
                first_name: "akhil",
                last_name: "test",
                gender: "male"
            },
            {
                id: 2,
                first_name: "sachin",
                last_name: "test",
                gender: "male"
            },
            {
                id: 3,
                first_name: "virat",
                last_name: "test",
                gender: "male"
            },
            {
                id: 4,
                first_name: "dhoni",
                last_name: "test",
                gender: "male"
            }
        ]);
        await Relationship.bulkCreate([
            {
                requested_id: 1,
                addressed_id: 2,
                status: 0,
                action_performed_id: 1
            },
            {
                requested_id: 2,
                addressed_id: 3,
                status: 2,
                action_performed_id: 2
            },
            {
                requested_id: 1,
                addressed_id: 3,
                status: 2,
                action_performed_id: 1
            },
            {
                requested_id: 2,
                addressed_id: 4,
                status: 2,
                action_performed_id: 2
            },
            {
                requested_id: 1,
                addressed_id: 4,
                status: 0,
                action_performed_id: 1
            },
            {
                requested_id: 3,
                addressed_id: 4,
                status: 0,
                action_performed_id: 3
            }
        ]);


    },

    down: async (queryInterface, Sequelize) => {
        await User.destory({ where: { id: [1, 2, 3, 4] } });
    }
};
