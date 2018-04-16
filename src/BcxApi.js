var fetch = require("node-fetch");
var axios = require("axios");
var ethUtil = require("ethereumjs-util")
var request = require("request-promise-native")

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
    var postResponse;
    fetchRequests(url, body, 'POST')
    .then(data =>{
        //console.log(data)
        postResponse = data;
    })
    .catch(error =>{
        //console.log(error)
    })
    return await postResponse
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

exports.sign = (payload, privateKey) => {
        digest = ethUtil.sha3(JSON.stringify(payload));
        signature =  ethUtil.secp256k1.sign(digest, privateKey);
        return  signature.signature.toString('hex')
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

    console.log(content.message)
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