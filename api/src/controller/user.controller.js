const { User } = require("../models/user");
const { sequelize } = require("../db/sequelize");
const { responeBuilder, RESCODE } = require("../utils");
const DEFAULT_SIZE = 100;
const DEFAULT_PAGE = 1;

/**
 * This method fetchs all users from database
 * @returns {Function}
 */
exports.getAllUsers = () => {
    return async (req, res) => {
        try {
            let { page_size, page } = req.query;
            page_size = page_size ? Number(page_size) : DEFAULT_SIZE;
            page = page ? Number(page) : DEFAULT_PAGE;
            let offset = (page - 1) * page_size;
            let data = await User.findAndCountAll({
                order: [["id"]],
                limit: page_size, offset
            });
            res.status(RESCODE.OK).send(responeBuilder(null, data));
        } catch (err) {
            res.status(RESCODE.INTERNAL_ERROR).send(responeBuilder({
                code: RESCODE.INTERNAL_ERROR,
                desc: "Sorry! something went wrong we are unable to fetch users"
            }));
        }
    };
};

exports.getAllUserFriendsById = () => {
    return async (req, res) => {
        try {
            let { user_id } = req.params;
            user_id = Number(user_id);
            if (isNaN(user_id)) {
                return res.status(RESCODE.PRECONDITION_FAILED).send(responeBuilder({
                    code: RESCODE.PRECONDITION_FAILED,
                    desc: "invalid user_id"
                }));
            }
            let query = "SELECT u.* from users u JOIN relationships r ON u.id = r.user_id "
                + "WHERE r.friend_id=:user_id AND r.status=2";

            let data = await sequelize.query(query, {
                replacements: { user_id, status: 2 },
                type: sequelize.QueryTypes.SELECT
            });
            res.status(RESCODE.OK).send(responeBuilder(null, data));
        } catch (err) {
            res.status(RESCODE.INTERNAL_ERROR).send(responeBuilder({
                code: RESCODE.INTERNAL_ERROR,
                desc: "Sorry! something went wrong we are unable to fetch friends"
            }));
        }
    };
};

exports.getAllFriendsOfUserFriendsById = () => {
    return async (req, res) => {
        try {
            let { user_id } = req.params;
            user_id = Number(user_id);
            if (isNaN(user_id)) {
                return res.status(RESCODE.PRECONDITION_FAILED).send(responeBuilder({
                    code: RESCODE.PRECONDITION_FAILED,
                    desc: "invalid user_id"
                }));
            }
            let query = "SELECT users.* from users "
                + "JOIN relationships ON users.id = relationships.user_id "
                + "WHERE relationships.friend_id IN "
                + "(SELECT friend_id from relationships where user_id =:user_id AND status=:status)";


            let result = await sequelize.query(query, {
                replacements: { user_id, status: 2 },
                type: sequelize.QueryTypes.SELECT
            });
            let friendsList = {};
            if (Array.isArray(result) && result.length > 0) {
                for (let user of result) {
                    if (!(user.id in friendsList))
                        friendsList[user.id] = user;
                }
            }
            res.status(RESCODE.OK).send(responeBuilder(null, Object.values(friendsList)));
        } catch (err) {
            res.status(RESCODE.INTERNAL_ERROR).send(responeBuilder({
                code: RESCODE.INTERNAL_ERROR,
                desc: "Sorry! something went wrong we are unable to fetch friends"
            }));
        }
    };
};




