const app = require('./app');
const PORT = process.env.PORT || 3003;

app.listen(PORT, function() {
	console.log(`Server is running on port ${process.env.PORT || PORT}.`);
});
