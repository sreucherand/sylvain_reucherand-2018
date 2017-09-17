const express = require('express');
const path = require('path');

const app = express();
const env = process.env.NODE_ENV || 'development';

app.use('/static', express.static('./static'));

if (env === 'development') {
  app.set('view cache', false);
  app.set('view engine', 'pug');
  app.set('views', path.join('src', 'views'));

  app.get('/', function (req, res) {
    res.render('index', require('./src/data/expose.js'));
  });

  app.locals.pretty = true;
}

if (env === 'production') {
  app.get('/', function (req, res) {
    res.sendFile(path.resolve('static', 'index.html'));
  });
}

app.listen(process.env.PORT || 3401);
