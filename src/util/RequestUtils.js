var request = require("request-promise")

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
exports.fetchRequests = (url, body, type, queryParams) => {
    
    const options ={
        
        uri: url,
        method: type,
        qs: queryParams,
        headers: { 'Content-Type': 'application/json' },
        body: body,
        json: true
    }
     
   return request(options);
}