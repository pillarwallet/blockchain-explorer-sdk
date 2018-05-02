var requesterUtils = require("../util/RequestUtils.js")
var dotEnv = require("dotenv");

/** 
    * Https POST request
    * @method registerAccount
    * @param  {String} url
    * @param  {Object} body
    */
exports.postRequest = (url, body) => {
    return requesterUtils.fetchRequests(process.env.BCX_SERVER_URL + url, body, 'POST', undefined)
    }
/** 
    * Https GET request
    * @method registerAccount
    * @param  {String} url
    * @param  {Object} body
    */
exports.getRequest = (url, body) => {
    return requesterUtils.fetchRequests(process.env.BCX_SERVER_URL + url, undefined, 'GET', body);
    }
/** 
    * Https PUT request
    * @method registerAccount
    * @param  {String} url
    * @param  {Object} body
    */
exports.putRequest = (url, body) => {
    return requesterUtils.fetchRequests(process.env.BCX_SERVER_URL + url, body, 'PUT', undefined);
    }
/** 
    * Https DELETE request
    * @method registerAccount
    * @param  {String} url
    * @param  {Object} body
    */
exports.deleteRequest = (url, body) => {
    return requesterUtils.fetchRequests(process.env.BCX_SERVER_URL + url, body, 'DELETE', undefined);
    }