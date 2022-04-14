const express = require('express');
const session = require('express-session');
const path = require('path');
const passport = require('passport')
const flash = require('express-flash')

const port = 3000;
require('./database/db');
const app = express();

const registerRoute = require('./routes/register')
const loginRoute = require('./routes/login')
const userlistRoute = require('./routes/userlist')

const Users = require('./models/Users')

app.set('view-engine', 'ejs');
app.set('views', path.join(__dirname, '/views'));
app.set('public', path.join(__dirname, '/public'));

app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(session({
    secret:"somesecrete",
    resave:false,
    saveUninitialized:false
}))
app.use(flash())
app.use(passport.initialize())
app.use(passport.session())



app.get('/', (req, res) => {
    res.render('home.ejs');
});

app.use('/register', registerRoute)
app.use('/login', loginRoute)
app.use('/userlist', userlistRoute)

app.listen(port, () => {
  console.log(`app is listening on port ${port}`);
});
