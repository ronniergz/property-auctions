const bodyParser = require('body-parser');
const cors = require('cors');
const scrapeList = require('./scrapeList.js');
const fs = require('fs');
const http = require('http');
const express = require('express');
const app = express();
const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log('Server is listening on port ', port);
});

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

/*---------------  Web Scraper  ---------------*/
// Get current list
app.get('/api/scrapeList', cors(), (req, res) => {
  scrapeList().then((result) => {
    res.send(result);
  });
});

// Get current list
app.get('/api/scrapeTest', cors(), (req, res) => {
  scrapeTest().then((result) => {
    res.send(result);
  });
});

// testing
app.get('/api/test', cors(), (req, res) => {
  res.send("Hello!");
});

process.once('SIGUSR2', function () {
  httpsServer.close(function () {
    process.kill(process.pid, 'SIGUSR2');
  });
});
