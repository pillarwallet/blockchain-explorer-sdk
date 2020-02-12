const BCX = require('../src');
const EthMethodsFactory = require('../src/factories/ethMethodsFactory');

describe('Tests if methodsFactory returns the correct instance', () => {
  test('Should return an ethMethodsFactory instance', () => {
    const bcx = new BCX({
      protocol: 'eth',
    });
    expect(bcx instanceof EthMethodsFactory).toBeTruthy();
  });

  test('Should not return an ethMethodsFactory instance', () => {
    const bcx = new BCX({
      protocol: 'btc',
    });
    expect(bcx instanceof EthMethodsFactory).toBeFalsy();
  });
});
