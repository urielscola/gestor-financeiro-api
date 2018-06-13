const mongoose = require("mongoose");

const cycleSchema = new mongoose.Schema({
	name: String,
	month: String,
	year: String,
	credits: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: "Credit"
		}
	],
	debits: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: "Debit"
		}
	]
});

module.exports = mongoose.model("Cycle", cycleSchema);
