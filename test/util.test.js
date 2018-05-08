describe('Request unit Test', () => {

var mockRequest;

beforeEach(() => {
    mockRequest = jest.fn();
        jest.mock("request-promise", () => {
            return mockRequest;
        })
})

afterEach(() => {
    jest.clearAllMocks();
  });

    it('Expected to call request', () => {

        var requestUtil = require("../src/util/RequestUtil");
            const options ={    
                uri: "arg1",
                method: "arg3",
                qs: "arg4",
                headers: { 'Content-Type': 'application/json' },
                body: "arg2",
                json: true
            }

        requestUtil.fetchRequests("arg1", "arg2", "arg3","arg4")
        expect(mockRequest).toBeCalledWith(options)

        })
    })
