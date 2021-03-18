const http = require('http');
const express = require('express');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const morgan = require('morgan');
const cors = require('cors');
const webServerConfig = require('../config/server');
const database = require('./database.js');

let httpServer;

function initialize() {
  return new Promise((resolve, reject) => {
    const app = express();
    httpServer = http.createServer(app);
    app.use(morgan('combined'));
    app.get('/', (req, res) => {
      res.end('Hello World!');
    });
    // cors
    app.use(cors());

    // secure
    app.use(helmet({
      dnsPrefetchControl: false,
      frameguard: false,
      ieNoOpen: false,
    }));

    // parsing
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(bodyParser.json());

    // use route, map route
    // app.use('/api', require('./api/routes'));
    // app.use('/swagger', require('./documents/swagger'));
    app.get('/', async (req, res) => {
      const result = await database.simpleExecute('select user, systimestamp from dual');
      const user = result.rows[0].USER;
      const date = result.rows[0].SYSTIMESTAMP;

      res.end('DB user: ${user}\nDate: ${date}');
    });
    httpServer.listen(webServerConfig.port, (err) => {
      if (err) {
        reject(err);
        return;
      }

      console.log(`Web server listening on localhost:${webServerConfig.port}`);

      resolve();
    });
  });
}

module.exports.initialize = initialize;
