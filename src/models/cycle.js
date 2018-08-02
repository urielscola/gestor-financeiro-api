const mongoose = require("mongoose");
const summary = require('../helpers/arrayHelper').summary; 

const CycleSchema = new mongoose.Schema({
	name: String,
	month: String,
	year: String,
	credits: [
		{
			name: String,
			value: Number,
			date: String
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


module.exports = mongoose.model("cycle", CycleSchema);
