const PORT = 3003;
const bodyParser = require('body-parser');
const express = require('express');
const server = express();
const allowCors = require('./cors');

server.use(bodyParser.urlencoded({ extended: true }));
server.use(bodyParser.json());
server.use(allowCors);


server.listen(process.env.PORT || PORT, function() {
	console.log(`Server is running on port ${process.env.PORT || PORT}.`);
});

module.exports = server;