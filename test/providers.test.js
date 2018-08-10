const requestProvider = require('../src/providers/RequestProvider');
const requestUtil = require('../src/util/RequestUtil');

let fetchRequests = requestUtil.fetchRequests;

describe('Fetch unit Test', () => {

  beforeEach(() => {
    requestUtil.fetchRequests = jest.fn();
  });

  afterEach(() => {
    requestUtil.fetchRequests = fetchRequests;
  });

  it('Expected to call fetchRequests with POST', () => {
    requestProvider.postRequest('arg1', 'arg2');
    expect(requestUtil.fetchRequests).toBeCalled();
    expect(requestUtil.fetchRequests).toBeCalledWith('arg1', 'arg2', 'POST', undefined);
  });

  it('Expected to call fetchRequests with GET', () => {
    requestProvider.getRequest('arg1', 'arg2');
    expect(requestUtil.fetchRequests).toBeCalled();
    expect(requestUtil.fetchRequests).toBeCalledWith('arg1', undefined, 'GET', 'arg2');
  });

  it('Expected to call fetchRequests with PUT', () => {
    requestProvider.putRequest('arg1', 'arg2');
    expect(requestUtil.fetchRequests).toBeCalled();
    expect(requestUtil.fetchRequests).toBeCalledWith('arg1', 'arg2', 'PUT', undefined);
  });

  it('Expected to call fetchRequests with DELETE', () => {
    requestProvider.deleteRequest('arg1', 'arg2');
    expect(requestUtil.fetchRequests).toBeCalled();
    expect(requestUtil.fetchRequests).toBeCalledWith('arg1', 'arg2', 'DELETE', undefined);
  });
});
