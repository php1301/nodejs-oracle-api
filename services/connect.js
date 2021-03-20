/* eslint-disable global-require */
const http = require('http');
const express = require('express');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const morgan = require('morgan');
const cors = require('cors');
const webServerConfig = require('../config/server');
const conn = require('./database.js');

let httpServer;

function initialize() {
  return new Promise((resolve, reject) => {
    const app = express();
    httpServer = http.createServer(app);
    app.use(morgan('dev'));
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
    app.use('/api', require('../api/routes'));
    // app.use('/swagger', require('./documents/swagger'));

    // TEST
    app.get('/', async (req, res) => {
      const result = await conn.raw('select 1 from dual');
      console.log(result);
      res.status(200).json({ result });
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
