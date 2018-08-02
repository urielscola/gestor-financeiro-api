// Loads environment variables
require('dotenv-safe').config();

const bodyParser = require('body-parser');
const app = require('express')();
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');

// app config
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());
app.use(helmet());
app.use(morgan('combined'));

// Setup routes
app.use(require('./controllers/index'));

// Setup mongoDB connection
require('./db/db.js');

module.exports = app;