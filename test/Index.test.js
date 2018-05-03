const sinon = require('sinon');
var assert = require("assert");
var requestProvider = require("../src/providers/RequestProvider");
var sdk = require("../");
var request = require("request-promise");
require('dotenv').load();

describe('Fetch unit Test', () => {
    it('Expected to return the correct payload', () => {  
        
    //var fetchMock = jest.unmock("../src/util/RequestProvider")
    requestProvider.postRequest = jest.fn()
    sdk.registerAccount("arg1","arg2","arg3","arg4","arg5")
    expect(requestProvider.postRequest).toBeCalled();
    expect(requestProvider.postRequest).toBeCalledWith("arg1","arg2","arg3","arg4","arg5")

    });
});