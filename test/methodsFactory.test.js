const BCX = require('../src');
const EthMethods = require('../src/factories/ethMethods');

describe('Tests if methodsFactory returns the correct instance', () => {
  test('Should return an ethMethods instance', () => {
    const bcx = new BCX({
      protocol: 'eth',
    });
    expect(bcx instanceof EthMethods).toBeTruthy();
  });

  test('Should not return an ethMethods instance', () => {
    const bcx = new BCX({
      protocol: 'btc',
    });
    expect(bcx instanceof EthMethods).toBeFalsy();
  });
});
