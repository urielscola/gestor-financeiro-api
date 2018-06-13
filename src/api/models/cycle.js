const mongoose = require("mongoose");

const cycleSchema = new mongoose.Schema({
	name: String,
	month: String,
	year: String,
	credits: [
		{
			name: String,
			value: Number
		}
	],
	debits: [
		{
			name: String,
			value: Number,
			status: String
		}
	]
});

module.exports = mongoose.model("Cycle", cycleSchema);
