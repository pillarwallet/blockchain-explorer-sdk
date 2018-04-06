var fetch = require("node-fetch");

this.SERVER_URL = "https://bcx-dev.pillarproject.io";
this.BCXREGISTER_URL =  this.SERVER_URL + "/register-new-wallet";
this.BCXFCMIID_URL =    this.SERVER_URL + "/updatefcmiid";
this.BCXHISTORY_URL =   this.SERVER_URL + "/txhistory";
this.BCXBALANCE_URL =   this.SERVER_URL + "/balance";


exports.postRequest = (url, body) => {          
            Object.keys(body).forEach((key) => (body[key] == undefined) && delete body[key]);
            let postBody = { 
                method: 'POST',
                body:    JSON.stringify({a:"1"}),
                headers: { 'Content-Type': 'application/json' },
                };
            let response;    
            fetch('http://httpbin.org/post', postBody)
            .then(res => res.json())
            .then(json => {
                response = json
            });
            return response
    };