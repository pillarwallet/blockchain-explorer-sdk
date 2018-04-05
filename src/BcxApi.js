var fetch = require("node-fetch");

function BcxApi(headers, body, url) {
    
    this.SERVER_URL = "http://bcx-dev.pillarproject.io:8000";
    this.BCXREGISTER_URL =  "/register-new-wallet";
    this.BCXFCMIID_URL =    "/updatefcmiid";
    this.BCXHISTORY_URL =   "/txhistory";
    this.BCXBALANCE_URL =   "/balance";

    BcxApi.prototype = {
        postRequest: (body, url) =>     
            fetch(url, { 
            method: 'POST',
            body:    JSON.stringify(body),
            headers: { 'Content-Type': 'application/json' },
            })
            .then(res => res.json())
            }
  }
module.exports = BcxApi;
