var requesterUtil = require("../util/RequestUtil");
var endpoints = require("../config/constants.js").httpsURL[process.env.NODE_ENV];


module.exports = {

/** 
    * Https POST request
    * @method registerAccount
    * @param  {String} url
    * @param  {Object} body
    */
    postRequest: (url, body) => {
        return requesterUtil.fetchRequests(endpoints.BCX_SERVER_URL + url, body, 'POST', undefined);
    },
/** 
    * Https GET request
    * @method registerAccount
    * @param  {String} url
    * @param  {Object} body
    */
    getRequest: (url, body) => {
        return requesterUtil.fetchRequests(endpoints.BCX_SERVER_URL + url, undefined, 'GET', body);
    },
/** 
    * Https PUT request
    * @method registerAccount
    * @param  {String} url
    * @param  {Object} body
    */
    putRequest: (url, body) => {
        return requesterUtil.fetchRequests(endpoints.BCX_SERVER_URL + url, body, 'PUT', undefined);
    },
/** 
    * Https DELETE request
    * @method registerAccount
    * @param  {String} url
    * @param  {Object} body
    */
    deleteRequest: (url, body) => {
        return requesterUtil.fetchRequests(endpoints.BCX_SERVER_URL + url, body, 'DELETE', undefined);
    }
}