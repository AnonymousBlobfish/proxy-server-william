const express = require('express');
const path = require('path');
const morgan = require('morgan');
const restaurantsInfoRouter = require('./routes/routes.js');
const bundleRouter = require('./routes/bundleRouter.js');

var axios = require('axios');

const app = express();

app.use(morgan('dev'));
// app.get('/', (req, res) => {
//   res.redirect('/restaurants/ChIJUcXYWWGAhYARmjMY2bJAG2s/');
// })

// app.use('/restaurants/:id', express.static('public'));
// app.get('/restaurants/:id/:widget/bundle.js', bundleRouter);

// app.get('/api/restaurants/:id/:widget', restaurantsInfoRouter);

app.get('/restaurants/serverside/:id', (req, res) => {
  axios.get('http://localhost:3003/api/restaurants/' + req.params.id + '/string').then((mapApp) => {
    axios.get('http://localhost:3003/bundle.js').then((bundle) => {
      console.log('mapApp: ', mapApp.data);
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
        <script>
        ${bundle.data}
        </script>
        </body>
        </html>`;
        res.send(html);
    });
  });
});

app.listen(4001, () => {
  console.log('Proxy listening on port 4001');
});
