var requestProvider = require("../src/providers/RequestProvider");
var requestUtil = require("../src/util/RequestUtil");

describe('Fetch unit Test', () => {
    it('Expected to call fetchRequests with POST', () => {
        
        requestUtil.fetchRequests = jest.fn();
        requestProvider.postRequest("arg1","arg2");

        expect(requestUtil.fetchRequests).toBeCalled();
        expect(requestUtil.fetchRequests).toBeCalledWith("arg1","arg2", 'POST', undefined);
    });

    it('Expected to call fetchRequests with GET', () => {
        
        requestUtil.fetchRequests = jest.fn();
        requestProvider.getRequest("arg1","arg2");

        expect(requestUtil.fetchRequests).toBeCalled();
        expect(requestUtil.fetchRequests).toBeCalledWith("arg1",undefined, 'GET', "arg2");
    });

    it('Expected to call fetchRequests with PUT', () => {
        
        requestUtil.fetchRequests = jest.fn();
        requestProvider.putRequest("arg1","arg2");

        expect(requestUtil.fetchRequests).toBeCalled();
        expect(requestUtil.fetchRequests).toBeCalledWith("arg1","arg2", 'PUT', undefined);
    });

    it('Expected to call fetchRequests with DELETE', () => {
        
        requestUtil.fetchRequests = jest.fn();
        requestProvider.deleteRequest("arg1","arg2");

        expect(requestUtil.fetchRequests).toBeCalled();
        expect(requestUtil.fetchRequests).toBeCalledWith("arg1","arg2", 'DELETE', undefined);
    });
});

