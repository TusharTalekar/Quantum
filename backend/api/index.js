const app = require('../server'); // Import your Express app
const serverless = require('serverless-http');

module.exports = serverless(app);
