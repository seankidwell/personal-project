const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const controller = require('./controller');

const app = express();
const port = 3090

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false
  })
);

app.listen(port, () => {
  console.log(`listening on ${port}`)
})