require('dotenv').config();

var express = require('express');
var app = express();
var user = require('./controllers/user-controller');
var animal = require('./controllers/animal-controller');
var sequelize = require('./db');
var bodyParser = require('body-parser');

sequelize.sync();

app.use(bodyParser.json());

app.use(require('./middleware/headers'));

app.use('/user', user);
app.use('/animal', animal);

app.listen(process.env.PORT, () => console.log(`app is listening on ${process.env.PORT}`));
