# Project Name

Displays a map sidebar module for 10,000,000 generated restaurant listings.

## Table of Contents

1. [Usage](#Usage)
1. [Requirements](#requirements)

## Usage

Ensure that the map sidebar module server is installed and running on a separate instance (repo can be found [here](https://github.com/AnonymousBlobfish/map-sidebar))

Update server/server.js with the ip address and port of the map sidebar module server for both the axios.get and the script src

>app.get('/restaurants/serverside/:id', (req, res) => {
  axios.get('http://[MODULE_SERVER_IP]:3003/api/restaurants/' + req.params.id + '/string').then((mapApp) => {
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
        <script src='http://[MODULE_SERVER_IP]:3003/bundle.js'></script>
        </body>
        </html>`;
        res.send(html);
  });
});

Start the server

```sh
node server/server.js
```

Access the server in the browser via http://**[PROXY_SERVER_IP]**:4001/restaurants/serverside/**[1-10000000]**

## Requirements

An `nvmrc` file is included if using [nvm](https://github.com/creationix/nvm).

- Node 6.13.0

### Installing Dependencies

From within the root directory:

```sh
npm install
```

