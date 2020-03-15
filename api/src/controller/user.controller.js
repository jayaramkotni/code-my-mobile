const { User } = require("../models/user");
//const { Relationship } = require("../models/relationship");
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
            res.send(responeBuilder(null, {
                data: await User.findAndCountAll({
                    order: [["created_at"]],
                    limit: page_size, offset
                })
            }));
        } catch (err) {
            res.send(responeBuilder({
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
                return res.send(responeBuilder({
                    code: RESCODE.PRECONDITION_FAILED,
                    desc: "invalid user_id"
                }));
            }
            let subquery = "SELECT addressed_id from relationships where" +
                "(requested_id=:user_id OR addressed_id =:user_id) AND status=:status";
            let query = `SELECT * from users WHERE id IN (${subquery})`;

            let data = await sequelize.query(query, {
                replacements: { user_id, status: 2 },
                type: sequelize.QueryTypes.SELECT
            });
            res.send(responeBuilder(null, data));
        } catch (err) {
            res.send(responeBuilder({
                code: RESCODE.INTERNAL_ERROR,
                desc: "Sorry! something went wrong we are unable to fetch users"
            }));
        }
    };
};






