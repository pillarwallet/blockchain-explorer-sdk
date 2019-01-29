/*
Copyright (C) 2019 Stiftung Pillar Project

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
*/
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
