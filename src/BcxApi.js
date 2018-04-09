var fetch = require("node-fetch");

this.SERVER_URL = "https://bcx-dev.pillarproject.io";
this.BCXREGISTER_URL =  this.SERVER_URL + "/register-new-wallet";
this.BCXFCMIID_URL =    this.SERVER_URL + "/updatefcmiid";
this.BCXHISTORY_URL =   this.SERVER_URL + "/txhistory";
this.BCXBALANCE_URL =   this.SERVER_URL + "/balance";


exports.postRequest = async (url, body) => {
        return await fetchRequests(url, body, 'POST')   
    }
exports.getRequest = async (url, body) => {
         return await fetchRequests(url, body, 'GET');
    }
exports.putRequest = async (url, body) => {
         return await fetchRequests(url, body, 'PUT');
    }
exports.deleteRequest = async (url, body) => {
         return await fetchRequests(url, body, 'DELETE');
    }


let  fetchRequests = (url, body, type) => {
    Object.keys(body).forEach((key) => (body[key] == undefined) && delete body[key]);

    let postBody = { 
        method: type,
        body:    JSON.stringify(body),
        headers: { 'Content-Type': 'application/json' },
        };

    return fetch(url, postBody)
            .then(function(res) {
                return res.json();
            })
            .then(function(json) {
                console.log(json) 
                return json 
            })
            .catch(function(error) { 
                console.log(error);
            });
}