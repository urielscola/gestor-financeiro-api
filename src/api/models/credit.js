const mongoose = require("mongoose");

const creditSchema = new mongoose.Schema({
	name: String,
	value: Number
});

module.exports = mongoose.model("Credit", creditSchema);
