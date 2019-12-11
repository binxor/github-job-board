'use strict';

const axios = require('axios');
const express = require('express');
const minimist = require('minimist');
const app = express();
const port = 3001;

const ARGS = minimist(process.argv.slice(2));
const TESTDATA = require('../data/https/jobs.github.com/positions/?search/remote.json');
const TEST = ARGS['test'] ? true : false;

const getData = async () => {
  if(TEST) {
    return await Promise.resolve(TESTDATA);
  } else {
    return await axios.get('https://jobs.github.com/positions.json?search=remote')
    .then(function (response) {
      return response.data;
    })
    .catch(function (error) {
      console.log(error);
      return { msg: 'Error', error }
    })
    .finally(function () {
    });
  }
}

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.get('/', async (req, res) => {
  res.send(await getData());
})

app.listen(port);
console.log('Node server listening on port', port)