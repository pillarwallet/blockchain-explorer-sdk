var fetch = require("node-fetch");

this.SERVER_URL = "https://bcx-dev.pillarproject.io";
this.BCXREGISTER_URL =  this.SERVER_URL + "/register-new-wallet";
this.BCXFCMIID_URL =    this.SERVER_URL + "/updatefcmiid";
this.BCXHISTORY_URL =   this.SERVER_URL + "/txhistory";
this.BCXBALANCE_URL =   this.SERVER_URL + "/balance";

exports.postRequest = (url, body) => {          
            Object.keys(body).forEach((key) => (body[key] == undefined) && delete body[key]);
            console.log(JSON.stringify(body))
            fetch(url, { 
            method: 'POST',
            body:    JSON.stringify(body),
            headers: { 'Content-Type': 'application/json' },
            })
            .then(res => res.json())
            .then(json => console.log(json))
    }
