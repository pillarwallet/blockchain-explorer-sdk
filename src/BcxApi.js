var fetch = require("node-fetch");

this.SERVER_URL = "https://bcx-dev.pillarproject.io";
this.BCXREGISTER_URL =  this.SERVER_URL + "/register-new-wallet";
this.BCXFCMIID_URL =    this.SERVER_URL + "/updatefcmiid";
this.BCXHISTORY_URL =   this.SERVER_URL + "/txhistory";
this.BCXBALANCE_URL =   this.SERVER_URL + "/balance";


exports.postRequest = (url, body) => {
         return fetchRequests(url, body, 'POST');
    }
exports.getRequest = (url, body) => {
         return fetchRequests(url, body, 'GET');
    }
exports.putRequest = (url, body) => {
         return fetchRequests(url, body, 'PUT');
    }
exports.deleteRequest = (url, body) => {
         return fetchRequests(url, body, 'DELETE');
    }
    

let  fetchRequests = async (url, body, type) => {
    Object.keys(body).forEach((key) => (body[key] == undefined) && delete body[key]);

    let postBody = { 
        method: type,
        body:    JSON.stringify(body),
        headers: { 'Content-Type': 'application/json' },
        };

    await fetch(url, postBody)
    .then(res => res.json())
    .then(json => {
        return json
    })
}