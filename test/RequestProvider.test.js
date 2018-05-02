const sinon = require('sinon');
var assert = require("assert");
var requestUtils = require("../src/util/RequestUtils");
var request = require("request-promise");
require('dotenv').load();

describe('Fetch unit Test', () => {
    it('Expected to return the correct payload', () => {  
        
      var fetchMock = jest.mock("../src/util/RequestUtils")

    const sendEventToParentWindowMock = jest.fn();
    const onChangeImageMock = jest.fn(() => {
         sendEventToParentWindowMock();
    });

    const gallery = shallow(<Gallery images={imagesMockData} onChange={onChangeImageMock} />); // Passing the mocked onChangeImage as prop
    gallery.find('input#image-1').simulate('change');

    expect(sendEventToParentWindowMock).toBeCalled();


        
    });
});