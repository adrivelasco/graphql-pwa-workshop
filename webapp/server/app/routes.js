'use strict';

const path = require('path');
const express = require('express');
const history = require('connect-history-api-fallback');

const renderHtml = require('./renderHtml');

const router = express.Router();

// Middleware to proxy requests through a specified index page, useful for SPA that utilise the HTML5 History API.
// https://github.com/bripkens/connect-history-api-fallback
router.use(history());

// Create a virtual path prefix (where the path does not actually exist in the file system) for files that
// are served by the express.static function, specify a mount path for the static directory, as shown below:
// http://expressjs.com/en/starter/static-files.html
router.use('/static', express.static(path.resolve(__dirname, '../../build/static')));

router.get('*', renderHtml);

module.exports = router;
