const express = require('express');

const MOCK_JSON = [
	{
		value: 500,
		name: "Teste"
	}
];

module.exports = function(server) {
	const ROUTER = express.Router();

	ROUTER.get('/', function(req, res) {
		res.json(MOCK_JSON);
	});

	server.use('/api', ROUTER);
}

/* 

CYCLES ROUTES 

GET => all cycles
GET => cycle/:id

POST => new cycle
PUT => update cycle

DELETE => delete cycle


CREDIT ROUTES



*/