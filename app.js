const express = require('express');
const path = require('path');
const exphbs = require('express-handlebars');
const methodOverride = require('method-override');
const flash = require('connect-flash');
const session = require('express-session');
const passport = require('passport');
const mongoose = require('mongoose');

const app = express();

// Load Project Model
require('./models/Project');
const Project = mongoose.model('projects');

// Load Routes
const projects = require('./routes/projects');
const users = require('./routes/users');

// Passport Config
require('./config/passport')(passport);

// Load Keys
const keys = require('./config/keys');

// Connect to Mongoose
mongoose
    .connect(
        keys.mongoURI,
        { useNewUrlParser: true }
    )
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log(err));

// Handlebars Helpers
const { select } = require('./helpers/hbs');

// Handlebars Middleware
app.engine(
    'handlebars',
    exphbs({
        helpers: {
            select
        },
        defaultLayout: 'main'
    })
);
app.set('view engine', 'handlebars');

// Static folder
app.use(express.static(path.join(__dirname, 'public')));

// Express body-parser Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Method Override Middleware
app.use(methodOverride('_method'));

// Express Session Middleware
app.use(
    session({
        secret: keys.secret,
        resave: true,
        saveUninitialized: true
    })
);

// Passport Middleware
app.use(passport.initialize());
app.use(passport.session());

// Connect Flash Middleware
app.use(flash());

// Global Variables
app.use(function(req, res, next) {
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    res.locals.error = req.flash('error');
    res.locals.user = req.user || null;
    next();
});

app.get('/', (req, res) => {
    Project.find({})
        .sort({ date: 'desc' })
        .then(projects => {
            res.render('index', {
                projects
            });
        });
});

// Use routes
app.use('/projects', projects);
app.use('/users', users);

app.get('*', (req, res) => {
    res.status(404).render('error');
});

const port = process.env.PORT || 5000;

app.listen(port, () => {
    console.log(`Server started at ${port}`);
});
