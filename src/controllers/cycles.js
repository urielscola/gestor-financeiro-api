const router = require('express').Router();
const Cycle = require('../models/cycle');
const User = require('../models/user');

const requireAuth = require('../middlewares/passportMiddlewares').requireAuth;

	router.get('/', requireAuth, function(req, res) {

		/*
		* Retorna todos os ciclos de determinado usuário a partir de seu ID
		*/

		Cycle.find({ userId: req.user.id }, function(err, cycles) {
			if (err) { return console.log(err); } 
			
            res.status(200).json({ cycles: cycles });
        });
	});


	router.get("/:id", requireAuth, function(req, res) {

		/*
		* Retorna um ciclo a partir de seu ID
		*/

		Cycle.findById(req.params.id, function(err, foundCycle) {
			if (err) { return res.status(404).send(err); } 

			res.json(foundCycle);
		});
	});


	router.post('/', requireAuth, function(req, res) {

		//FIXME: VALIDAR INPUT

		/*
		* Criando novo objeto de Cycle a partir dos parâmetros recebidos e validados
		*/

		const cycle = new Cycle({ 
			name: req.body.name,
			month: req.body.month,
			userId: req.user.id,
			year: req.body.year,
			credits: req.body.credits || [], 
			debits: req.body.debits || [] 
		});

		/*
		* - Salvar ciclo
		* - Inserir o ID do novo ciclo como referência no array de ciclos do usuário
		*/

		cycle.save(function(err, newCycle) {
			if (err) { return res.status(400).send(err); } 

			User.findById(newCycle.userId, function(err, user) {
				if (err) { return res.status(400).send(err) }

				user.cycles.push(newCycle.id);
				user.save(function(err) {
					if (err) { return res.status(400).send(err) }
					
					res.status(201).json(newCycle);
				});
			});
		});
	});


	router.delete('/:id', requireAuth, function(req, res) {

		//FIXME: VALIDAR INPUT

		/*
		* - Remove um ciclo por ID
		*/

		Cycle.findById(req.params.id, function(err, cycle) {
			if (err) { return res.status(400).send(err); }

			cycle.remove(function(err) {	
				if (err) { return res.status(400).send(err); }
				res.status(200).send({ sucesss: true });
			});

		});
	});


	router.put('/:id', requireAuth, function(req, res) {

		//FIXME: VALIDAR INPUT
		
		const newCycle = {
			name: req.body.name,
			month: req.body.month,
			year: req.body.year,
			credits: req.body.credits, 
			debits: req.body.debits,
			userId: req.user.id
		}

		Cycle.findByIdAndUpdate(req.params.id, { $set: newCycle }, function(err, updatedCycle) {
			if (err) { return res.status(400).send(err);} 
			console.log("?")
			res.status(200).json(updatedCycle);
		});
	});

module.exports = router;