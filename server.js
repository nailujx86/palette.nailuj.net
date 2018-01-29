// server.js
// where your node app starts

// init project
var express = require('express');
var exphbs = require('express-handlebars');
var mongoose = require('mongoose');
var dbConfig = require('./db.js');
var passport = require('passport');
var expressSessions = require('express-session');
var MongoStore = require('connect-mongo');
var app = express();

mongoose.connect(dbConfig.url);
                 
app.use(expressSessions({
  secret: 'nailuj-palette',
  resave: true,
  saveUninitialized: false,
  store: new MongoStore({
    mongooseConnect: mongoose.connection
  })
}));

app.use(passport.initialize());
app.use(passport.session());

var hbs = exphbs.create({defaultLayout: 'main', extname: 'hbs'});
app.engine('hbs', hbs.engine);
app.set('view engine', 'hbs');
//app.enable('view cache');
app.use(express.static('public'));

var Palette = require('./models/palette.js');

//app.use("/", require('./routes/index');
//app.use("/details", require('./routes/details'));

var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
