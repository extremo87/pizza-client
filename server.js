const express = require('express');
const path = require('path');
const app = express();
app.use(express.static(__dirname + '/public'));
app.listen(80);
console.log('Pizza server started');