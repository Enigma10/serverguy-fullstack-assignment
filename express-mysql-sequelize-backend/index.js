const express = require('express');
const bodyParser = require('body-parser')
const passport = require('passport')
const cors = require('cors')
const session = require("express-session");
const MySQLStore = require('express-mysql-session')(session);

const user = require('./routes/user')
const search = require('./routes/search')
const auth = require('./routes/auth')

const options = {
  host: 'sql12.freemysqlhosting.net',
  port: 3306,
  user: 'sql12265380',
  password: 'W4JujRaPvu',
  database: 'sql12265380'
};
const sessionStore = new MySQLStore(options);

const app = express();
const port = 3000;

require('./passport')
const whiteListHosts = [
  'http://localhost:3001',
]
app.use(cors({
  origin: (origin, callback) => {
    if (whiteListHosts.indexOf(origin) !== -1 || !origin) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  },
  credentials: true,
}))
// app.use(cors())
app.use(
  session({
    secret: "cat",
    resave: false,
    saveUninitialized: false,
    store: sessionStore,
    cookie: { 
      secure: false,
      maxAge: 30 * 24 * 60 * 60 * 1000
    }
  })
)
app.use(require('cookie-parser')());
app.use(bodyParser.json())
// app.use(require('body-parser').urlencoded({ extended: true }));
app.use(passport.initialize());
app.use(passport.session())
app.use('/auth', auth)
app.use('/user', user)
app.use('/search', search)

app.get('/', (_, res) => {
  res.status(200).send({
    status: true,
    message: 'Welcome You',
  })
})
app.listen(port, () => {
  console.log(`Server started at port ${port}`);
});