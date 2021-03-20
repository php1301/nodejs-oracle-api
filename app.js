/* eslint-disable no-console */

const webServer = require('./services/connect.js');
// const database = require('./services/database.js');

async function startup() {
  // Database
  try {
    console.log('Initializing database module');

    // await database.initialize();
  } catch (err) {
    console.error(err);

    process.exit(1); // Non-zero failure code
  }
  // Server
  try {
    console.log('Initializing web server module');

    await webServer.initialize();
  } catch (err) {
    console.error(err);

    process.exit(1); // Non-zero failure code
  }
}

startup();
