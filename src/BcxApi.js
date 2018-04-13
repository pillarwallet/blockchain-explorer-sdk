var fetch = require("node-fetch");

this.SERVER_URL = "https://bcx-dev.pillarproject.io";
this.BCXREGISTER_URL =    this.SERVER_URL + "/wallet-backend/register-new-wallet";
this.BCXUNREGISTER_URL =  this.SERVER_URL + "/wallet-backend/unregister-wallet";
this.BCXFCMIID_URL =      this.SERVER_URL + "/updatefcmiid"; // /wallet-backend/updatefcmiid
this.BCXHISTORY_URL =     this.SERVER_URL + "/txhistory"; // /wallet-client/txhistory GET
this.BCXBALANCE_URL =     this.SERVER_URL + "/balance"; // /wallet-client/balance GET

/** 
    * Https POST request
    * @method registerAccount
    * @param  {String} url
    * @param  {Object} body
    */
exports.postRequest = async (url, body) => {
        return  fetchRequests(url, body, 'POST'); 
    }
/** 
    * Https GET request
    * @method registerAccount
    * @param  {String} url
    * @param  {Object} body
    */
exports.getRequest = (url, body) => {
         return fetchRequests(url, body, 'GET');
    }
/** 
    * Https PUT request
    * @method registerAccount
    * @param  {String} url
    * @param  {Object} body
    */
exports.putRequest = (url, body) => {
         return fetchRequests(url, body, 'PUT');
    }
/** 
    * Https DELETE request
    * @method registerAccount
    * @param  {String} url
    * @param  {Object} body
    */
exports.deleteRequest = (url, body) => {
         return fetchRequests(url, body, 'DELETE');
    }

/** 
    * Fetch https requests
    * @method fetchRequests
    * @param  {String} url
    * @param  {Object} body
    * @param  {String} Type
    */
let  fetchRequests = async (url, body, type) => {
    Object.keys(body).forEach((key) => (body[key] == undefined) && delete body[key]);

    let postBody = { 
        method: type,
        body:    JSON.stringify(body),
        headers: { 'Content-Type': 'application/json' }
        };
 
    var content = await (await fetch(url, postBody)).text();
    console.log(JSON.parse(content));
    return await content;
}