var request = require("request-promise")

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
    return request(options)

    }