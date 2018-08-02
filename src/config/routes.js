const express = require('express');
const Cycle = require('../api/models/cycle.js');
const Leftovers = require('../api/models/leftovers.js');
const Authentication = require('../api/controllers/authentication');
const passportService = require('../api/services/passport');
const passport = require('passport');

const requireAuth = passport.authenticate('jwt', { session: false });
const requireSignin = passport.authenticate('local', { session: false });

module.exports = function(server) {
	const ROUTER = express.Router();

	// ALL LEFTOVERS
	ROUTER.get('/leftovers', function(req, res) {
		Leftovers.find({}, function(err, leftovers) {
			if (err) {
				console.log(err);
			} else { 
				res.json(leftovers);
			}
		});
	});

	// CREATE LEFTOVER
	ROUTER.post('/leftovers', function(req, res) {
		const leftover = {
			value: req.body.value
		}

		Leftovers.create(leftover, function(err, newLeftover) {
			if (err) {
				console.log(err);
			} else {

				newLeftover.save(function(err, newlyLeftover) {
					if (err) {
						console.log(err);
						res.status(400).send(err);
					} else {
						//res.json(newlyCycle);
						Leftovers.find({}, function(err, leftovers) {
							if (err) {
								console.log(err);
							} else { 
								res.json(leftovers);
							}
						});
					}
				});
			}
		});
	});

	// DELETE LEFTOVER
	ROUTER.delete('/leftovers/:id', function(req, res) {

		Leftovers.findByIdAndRemove(req.params.id, function(err) {
			if (err) {
				res.status(400).send("Error removing leftover");
			} else {
				//res.status(200).send("OK");
				Leftovers.find({}, function(err, leftovers) {
					if (err) {
						console.log(err);
					} else { 
						res.json(leftovers);
					}
				});
		  }
		});
	});

	ROUTER.get('/hehehe', requireAuth, function(req, res) {
		res.send("Yeah!");
	});

	ROUTER.post('/signup', Authentication.signup);

	ROUTER.post('/signin', requireSignin, Authentication.signin);

	// NOT FOUND
	ROUTER.get('*', function(req, res) {
		res.status(404).send('Invalid endpoint.');
	});




	server.use('/api', ROUTER);
}