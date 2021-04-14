const express        = require('express');
const app            = express();
const bodyParser     = require('body-parser');
const cors           = require('cors');
const session        = require('express-session')

require('./db/db');


app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: false
}));

// SET UP CORS AS MIDDLEWARE, SO any client can make a request to our server
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());


// CORS allows requests to come in from React
app.use(cors());



// Require the controller after the middleware
const bookController = require('./controllers/bookController');
const authController  = require('./controllers/authController');

app.use('/api/v1/books', bookController);
app.use('/auth', authController);

app.listen(process.env.PORT || 9000, () => {
  console.log('listening on port 9000');
});
