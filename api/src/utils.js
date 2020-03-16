"use strict";

const RESCODE = {
    OK: "200",
    AUTH_FAILURE: "401",
    EXPACTATION_FAILURE: "417",
    INVALID_ENTITY: "422",
    INTERNAL_ERROR: "500",
    BAD_REQUEST: "400",
    PRECONDITION_FAILED: "412",
    NO_CONTENT: "204"
};
const STATUS = {
    200: "Ok",
    201: "Created",
    204: "No Content",
    400: "Bad Request",
    412: "Precondition Failed",
    417: "Expectation Failed",
    422: "Unprocessable Entity",
    500: "Internal Server Error"
};

/**
 * Method to create response meta object
 * @param {String} desc
 * @return {Object}
 */
const getSuccessMeta = (desc) => {
    let res = {};
    res.status = STATUS[RESCODE.OK];
    res.code = Number(RESCODE.OK);
    res.description = desc;
    return res;
};

/**
 * Method to create failure response meta object
 * @param {*} code
 * @param {String} desc
 * @return {Object}
 */
const getFailureMeta = (code, desc) => {
    let res = {};
    res.status = STATUS[code];
    res.code = Number(code);
    res.description = desc;
    return res;
};

/**
 * Method to creates response object 
 * @param {*} err 
 * @param {*} data 
 * @return {Object}
 */
const responeBuilder = (err, data) => {
    if (err) {
        return {
            data: null,
            meta: getFailureMeta(err.code, err.desc)
        };
    }
    return {
        data, meta: getSuccessMeta(data.msg)
    };



};

module.exports = { responeBuilder, RESCODE };
