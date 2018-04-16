require('newrelic');
const express = require('express');
const path = require('path');
const morgan = require('morgan');
const restaurantsInfoRouter = require('./routes/routes.js');
const bundleRouter = require('./routes/bundleRouter.js');
const axios = require('axios');
const app = express();

app.get('/restaurants/serverside/:id', (req, res) => {
  axios.get('http://172.31.31.44:3003/api/restaurants/' + req.params.id + '/string').then((mapApp) => {
      var mapState = mapApp.data.split('%$%$^^%$%$')[1];
      var mapSidebar = mapApp.data.split('%$%$^^%$%$')[0];
      var html = `<!DOCTYPE>
        <html>
        <head>
          <title>Server Side Rendering</title>
        </head>
        <body>
        <script>
          window.mapState = ${mapState};
        </script>
        <div id=sidebar-app>
        ${mapSidebar}
        </div>
        <script src='http://34.227.223.118:5200/bundle.js'></script>
        </body>
        </html>`;
        res.send(html);
  });
});

app.listen(4001, () => {
  console.log('Proxy listening on port 4001');
});