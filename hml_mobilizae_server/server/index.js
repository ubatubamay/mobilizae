const express = require('express');
const app = express();
const morgan = require('morgan');
const cors = require('cors');
const passport = require('passport');
const social = require('./passport/passport')(app, passport);

const { mongoose } = require('./database');

// Settings
app.set('port', process.env.PORT || 3000);

// Middlewares
app.use(morgan('dev'));
app.use(express.json());
app.use(cors({origin: 'http://localhost:4200'}));

// Routes
app.use('/*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});
app.use('/api/employees', require('./routes/employee.routes'));
app.use('/api/schools', require('./routes/school.routes'));
app.use('/api/users', require('./routes/user.routes'));
app.use('/api/campaings', require('./routes/campaing.routes'));
app.use('/api/ajudas', require('./routes/ajuda.routes'));

// Starting the server
app.listen(app.get('port'), () => {
    console.log('Server on port', app.get('port'));
});