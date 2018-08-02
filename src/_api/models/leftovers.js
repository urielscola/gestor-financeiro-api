const mongoose = require("mongoose");

const leftOverSchema = new mongoose.Schema({
	value: Number
});

module.exports = mongoose.model("leftover", leftOverSchema);
