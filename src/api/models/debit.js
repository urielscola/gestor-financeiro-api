const mongoose = require("mongoose");

const debitSchema = new mongoose.Schema({
	name: String,
	value: Number,
	status: String
});

module.exports = mongoose.model("Debit", debitSchema);
