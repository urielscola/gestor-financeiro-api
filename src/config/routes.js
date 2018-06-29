const express = require('express');
const Cycle = require('../api/models/cycle.js');


module.exports = function(server) {
	const ROUTER = express.Router();


	// ALL CYCLES
	ROUTER.get('/cycles', function(req, res) {
		Cycle.find({}, function(err, cycles) {
				if (err) {
					console.log(err);
				} else { 
					res.json(cycles);
				}
			});
	});


	//SINGLE CYCLE
	ROUTER.get("/cycles/:id", function(req, res) {

		Cycle.findById(req.params.id, function(err, foundCycle) {
			if (err) {
				res.status(404).send('Error.');
			} else {
				res.json(foundCycle);
			}
		});
	});



	//NEW CYCLE
	ROUTER.post('/cycles', function(req, res) {

		const cycle = {
			name: req.body.name,
			month: req.body.month,
			year: req.body.year,
			credits: req.body.credits, 
			debits: req.body.debits
		}

		Cycle.create(cycle, function(err, newCycle) {
			if (err) {
				console.log(err);
			} else {

				newCycle.save(function(err, newlyCycle) {
					if (err) {
						console.log(err);
						res.status(400).send(err);

					} else {
						//res.json(newlyCycle);
						Cycle.find({}, function(err, cycles) {
							if (err) {
								console.log(err);
							} else { 
								res.json(cycles);
							}
						});
					}
				});
			}
		});
	});


	// DELETE CYCLE
	ROUTER.delete('/cycles/:id', function(req, res) {

		Cycle.findByIdAndRemove(req.params.id, function(err) {
			if (err) {
				res.status(400).send("Error removing cycle");
			} else {
				//res.status(200).send("OK");
				Cycle.find({}, function(err, cycles) {
					if (err) {
						console.log(err);
					} else { 
						res.json(cycles);
					}
				});
		  }
		});
	});


	// UPDATE CYCLE
	ROUTER.put('/cycles/:id', function(req, res) {
		//var newCycle = {}; //receber objeto cycle e atualizar

		const newCycle = {
			name: req.body.name,
			month: req.body.month,
			year: req.body.year,
			credits: req.body.credits, 
			debits: req.body.debits
		}

		Cycle.findByIdAndUpdate(req.params.id, { $set: newCycle }, function(err, updatedCycle) {
			if (err) {
				res.status(400).send("Error updating cycle.");
			} else {
				//res.json(updatedCycle);
				Cycle.find({}, function(err, cycles) {
					if (err) {
						console.log(err);
					} else { 
						res.json(cycles);
					}
				});
			}
		});
	});

	// NOT FOUND
	ROUTER.get('*', function(req, res) {
		res.status(404).send('Invalid endpoint.');
	});


	server.use('/api', ROUTER);
}