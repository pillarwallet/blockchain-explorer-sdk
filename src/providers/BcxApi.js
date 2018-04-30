var fetch = require("node-fetch");
var axios = require("axios");
var request = require("request-promise-native")

/** 
    * Https POST request
    * @method registerAccount
    * @param  {String} url
    * @param  {Object} body
    */
exports.postRequest = async (url, body) => {
    var postResponse;
    fetchRequests(url, body, 'POST')
    .then(data =>{
        console.log(data.message)
    })
    .catch(error =>{
        console.log(error)
    })
    return postResponse
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

exports.createPayload = (walletId, walletAddress, fcmIID = undefined, serverPublicKey = undefined) => {

    const data = { 
            walletId:           walletId,
            ethAddress:         walletAddress,
            fcmIID:             fcmIID,
            requesterPublicKey: serverPublicKey,
        };

        Object.keys(data).forEach((key) => (data[key] == undefined) && delete data[key]);
        return data
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
 
    var content = await (await fetch(url, postBody)).json();
    return content;
}

let fetchRequestsAxios = (url, body, type) => {
    config = {
        headers: { 'Content-Type': 'application/json' }
    };
    const request = axios.post(url, body, config)
    .then(response => {
        return response.data;
    })
    .catch(error => error)

    return request
};

let fetchRequestsReq = (url, body, type) => {
    const options = {
        url: url,
        method: type,
        body: body,
        json: true,
      };
      return request(options);
}