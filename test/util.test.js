const requestUtil = require('../src/util/RequestUtil');

describe('Request unit Test', () => {
  beforeEach(() => {
    jest.mock('request-promise');
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('Expected to call request', () => {
    const options = {
      uri: 'arg1',
      method: 'arg3',
      qs: 'arg4',
      headers: { 'Content-Type': 'application/json' },
      body: 'arg2',
      json: true,
    };

    const test = requestUtil.fetchRequests('arg1', 'arg2', 'arg3', 'arg4');

    expect(test.uri.href).toBe(options.uri);
    expect(test.body).toBe(options.body);
    expect(test.method).toBe(options.method);
    expect(test._rp_options.qs).toBe(options.qs); // eslint-disable-line
    expect(test.headers).toEqual(options.headers);
  });
});
