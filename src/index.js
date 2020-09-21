// Dependencies
const express = require('express');
const bodyParser = require('body-parser');

// Initializations
const app = express();
require('./database');

// Settings
app.set('port', process.env.PORT || 8080);
app.set('json spaces', 2);

// Middlewares
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

// Routes
app.use('/users', require('./routes/users'));

// Server is listenning
app.listen(app.get('port'), () => {
    console.log('Server on port', app.get('port'));
});

module.exports = app;