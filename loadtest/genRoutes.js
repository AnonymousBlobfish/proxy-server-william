const fs = require('fs');

const stream = fs.createWriteStream('/Users/zhart/code/sdc/proxy-server-william/loadtest/routes.txt');

const writer = (n) => {
  let isReady = true;
  while (isReady && n < 10e6 + 1) {
    if (Math.random() <= 0.8) {
      var randNum = Math.floor((Math.random() * 2e6) + 1)
      var url = `GET http://54.226.101.184:4001/restaurants/serverside/${randNum}/`;
      if (n !== 10e6) {
        isReady = stream.write(`${url}\n`);
      } else {
        isReady = stream.write(`${url}`);
      }
      n += 1; 
    } else {
      var randNum = Math.floor((Math.random() * (1e7 - 2e6) + 2e6 + 1));
      var url = `GET http://54.226.101.184:4001/restaurants/serverside/${randNum}/`;
      if (n !== 10e6) {
        isReady = stream.write(`${url}\n`);
      } else {
        isReady = stream.write(`${url}`);
      }
      n += 1; 
    }
  }
  stream.once('drain', () => {
    writer(n);
  });
  console.log('draining at ', n);
};

writer(1);