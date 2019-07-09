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
let mockRequest;
jest.mock('request-promise', () => {
  mockRequest = jest.fn();
  return mockRequest;
});
const requestUtil = require('../src/util/RequestUtil');

describe('Request unit Test', () => {
  afterAll(() => {
    jest.restoreAllMocks();
  });

  it('Expected to call request', async () => {
    const options = {
      uri: 'arg1',
      method: 'POST',
      qs: 'arg4',
      headers: { 'Content-Type': 'application/json' },
      // eslint-disable-next-line no-useless-escape
      body: 'query { searchTransaction(\"arg2\") }',
    };
    const responseObject = {
      data: {
        searchTransaction: {
          body: {
            txHistory: [],
            txCount: 1,
          },
        },
      },
    };
    mockRequest.mockImplementation(() => JSON.stringify(responseObject));
    await requestUtil.fetchRequests('arg1', 'arg2', 'POST', 'arg4', 'query', 'searchTransaction');
    expect(mockRequest).toBeCalledWith(options);
  });
});
