const mongoose = require("mongoose");
const summary = require('../helpers/arrayHelper').summary; 
const Schema = mongoose.Schema;
const User = require('./user');

const CycleSchema = new Schema({
	name: String,
	month: String,
	year: String,
	userId: {
		type: Schema.Types.ObjectId,
		ref: 'user'
	},
	credits: [
		{
			name: String,
			value: Number,
			date: String,
		}
	],
	debits: [
		{
			name: String,
			value: Number,
			status: String,
			date: String
		}
	]
},
	{
		toObject: { virtuals: true },
		toJSON: { virtuals: true }
	}
);

CycleSchema.virtual('totalCredits').get(function() {
	return summary(this.credits);
});


CycleSchema.virtual('totalDebits').get(function() {
	return summary(this.debits);
});

CycleSchema.virtual('balance').get(function() {
	return (summary(this.credits) - summary(this.debits));
});


/* 
* Antes de deletar um ciclo, remove sua referência ID do usuário
*/
CycleSchema.pre('remove', function(next) {

	const cycle = this;

	User.findById(cycle.userId, function(err, user) {
		if (err) { return next(err); }

		let index = user.cycles.indexOf(cycle._id);
		if (index > -1) {
			user.cycles.splice(index, 1);
		}

		user.save(function(err) {
			if (err) { return next(err); }
			next();
		});
	});
});


module.exports = mongoose.model("cycle", CycleSchema);
