const path = require('path'); //for ststic files
const morgan = require('morgan');

const cors = require('cors');
const express = require('express');
const isAuth = require('./middleware/is-auth');

const methodOverride = require('method-override'); //for making delete function

const bodyParser = require('body-parser'); //for parsing incoming requests

//npm install --save mongoose
const mongoose = require('mongoose'); // It helps us to define a model/schema of how our "project" data should look like.
//Then we will instantiate those schemas and run queries.


//npm install --save express-session
const session = require('express-session'); // For managing sessions

//Storing session on mongoDB
//npm install --save connect-mongodb-session
const MongoDBStore = require('connect-mongodb-session')(session); //(session) is imported form above imported file.


const csrf = require('csurf') //CSRF Token

const flash = require('connect-flash'); //For error flash message while logging in



//404 Error page 
const errorController = require('./controllers/error');

//Importing user model.
const User = require('./models/user');

//MongoDB server link
const MONGODB_URI =
'mongodb+srv://amcadmin:jgxP1d9B0PkcCjv1@cluster0.g6l0k.mongodb.net/amcDB';

const app = express();

app.use(cors());
//storing session on mongoDB
const store = new MongoDBStore({
  uri: MONGODB_URI, //on which database server to store session data.
  collection: 'sessions' //in which collection
});


//initializing csrf protection
const csrfProtection = csrf();



//toggling views
app.set('view engine', 'ejs');
app.set('views', 'views');

app.use(methodOverride('_method'));

//routes
const adminRoutes = require('./routes/admin');
const projectRoutes = require('./routes/project');
const authRoutes = require('./routes/auth');

const routesApi = require('./routesApi/api');

const teamRouter = require('./routes/team'); //for teams page
const alumRouter = require('./routes/alum');
const resourcesRouter = require('./routes/resources');
const achievementsRouter = require('./routes/achievements');
const eventsRouter = require('./routes/events');

//parsing requests
app.use(bodyParser.urlencoded({ extended: false }));

//serving static files
app.use(express.static(path.join(__dirname, 'public')));


// NOTE:
//Cookies are stored on client side and Sessions are stored on server side.

app.use(
  session({
    secret: 'my secret', //for hashing id in cookie.
    resave: false, //session will not be saved on every request but only when something changes in session
    saveUninitialized: false,
    store: store //storing session on database
  })
);

app.use(csrfProtection); //protection enabled

app.use(flash()); //Initializing flash

app.use((req, res, next) => {
  if (!req.session.user) {
    return next();
  }
  User.findById(req.session.user._id)
    .then(user => {
      req.user = user;
      next();
    })
    .catch(err => console.log(err));
});

//We need to have CSRF protection and authentication on every page we render therefore we will use a middleware before going through routes middleware
app.use((req,res,next) => {
  res.locals.isAuthenticated = req.session.isLoggedIn,
  res.locals.csrfToken= req.csrfToken()
  next();
})

//Connecting to routes middleware
app.use('/db/admin', adminRoutes);
app.get('/db/admin/team', isAuth, (req,res,next) => {
  res.render('tviews/index')
});
app.use(projectRoutes);
app.use(authRoutes);
app.use('/db/team', isAuth, teamRouter);
app.use('/db/alum', isAuth,alumRouter);
app.use('/db/resources', isAuth,resourcesRouter);
app.use('/db/achievements',isAuth,achievementsRouter);
app.use('/db/events',isAuth,eventsRouter);


app.use(morgan('tiny'));
app.get('/teams', routesApi);
app.get('/projects', routesApi);
app.get('/alumni', routesApi);
app.get('/events', routesApi);
app.get('/resources', routesApi);
app.get('/achievements', routesApi);
app.get('/:productid', routesApi);

//getting error page
app.use(errorController.get404);

//Connecting to mongoDB server
mongoose
  .connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false })
  .then(result => {
   console.log('Connected!');
    // app.listen(3000);
  })
  .catch(err => {
    console.log(err);
  });

  module.exports = app;