var convict = require('convict');
 
// Define a schema
var config = convict({
  env: {
    doc: "The application environment.",
    format: ["production", "development", "test"],
    default: "development",
    env: "NODE_ENV"
  },
  bcxServerUrl: {
    format: 'url',
    default: '',
    arg: 'bcxServerUrl',
    env: 'BCX_SERVER_URL',
  },
  bcxGetBalance: {
    format: 'url',
    default: '',
    arg: 'bcxGetBalance',
    env: 'BCX_GET_BALANCE',
  },
  bcxTxHistory: {
    format: 'url',
    default: '',
    arg: 'bcxTxHistory',
    env: 'BCX_TX_HISTORY',
  },
});

// Load environment dependent configuration
var env = config.get('env');
config.loadFile('./config/' + env + '.json');
 
// Perform validation
config.validate({allowed: 'strict'});
 
module.exports = config;