const router = require('express').Router();
const Cycle = require('../models/cycle');


	// ALL CYCLES
	router.get('/', function(req, res) {
		Cycle.find({}, function(err, cycles) {
            if (err) {
                console.log(err);
            } else { 
                res.json(cycles);
            }
        });
	});

	//SINGLE CYCLE
	router.get("/:id", function(req, res) {
		Cycle.findById(req.params.id, function(err, foundCycle) {
			if (err) {
				res.status(404).send('Error.');
			} else {
				res.json(foundCycle);
			}
		});
	});

	//NEW CYCLE
	router.post('/', function(req, res) {

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
						console.log(JSON.stringify(newlyCycle));
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
	router.delete('/:id', function(req, res) {
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
	router.put('/:id', function(req, res) {

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

module.exports = router;