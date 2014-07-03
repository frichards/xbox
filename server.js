var express = require('express');
var bodyParser = require('body-parser');
var http = require('http');
var app = express();
app.use(bodyParser.json());

app.listen(9000);

FB.api(
    "/v2.0/me",
    function (response) {
      if (response && !response.error) {
        /* handle the result */
      }
    }
);