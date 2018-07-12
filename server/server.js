const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const massive = require('massive');
const axios = require('axios');
const controller = require('./controller');
require('dotenv').config();

const app = express();
const port = 3090

let {
  REACT_APP_CLIENT_ID,
  CLIENT_SECRET,
  REACT_APP_DOMAIN,
  CONNECTION_STRING,
  SESSION_SECRET
} = process.env;

app.use(bodyParser.json());
app.use(
  session({
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: false
  })
);

massive(CONNECTION_STRING).then(db => {
  app.set("db", db);
});

app.get("/auth/callback", async (req, res) => {

  let payload = {
    client_id: REACT_APP_CLIENT_ID,
    client_secret: CLIENT_SECRET,
    code: req.query.code,
    grant_type: "authorization_code",
    redirect_uri: `http://${req.headers.host}/auth/callback`
  };

  let responseWithToken = await axios.post(
    `https://${REACT_APP_DOMAIN}/oauth/token`,
    payload
  );

  let userData = await axios.get(
    `https://${REACT_APP_DOMAIN}/userinfo?access_token=${
      responseWithToken.data.access_token
    }`
  );

  const db = req.app.get("db");
  let { sub, name, picture } = userData.data;
  let userExists = await db.find_user([sub]);
  if (userExists[0]) {
    req.session.user = userExists[0];
    res.redirect('http://localhost:3000/#/');
  } else {
    db.create_user([sub, name, picture]).then(createdUser => {
      req.session.user = createdUser[0];
      res.redirect('http://localhost:3000/#/');
    });
  }
});

app.get('/api/logout', controller.logout);

app.get('/api/user-data', controller.getUserData);

app.get('/api/forum/posts', controller.getAllPosts);
app.get('/api/forum/posts/:id', controller.getPost);
app.post('/api/forum/posts', controller.createPost);
app.put('/api/forum/posts/:id', controller.editPost);
app.delete('/api/forum/posts/:id', controller.deletePost);

app.get('/api/forum/comments/:id', controller.getComments);
app.post('/api/forum/comments/:postId/', controller.createComment);

app.listen(port, () => {
  console.log(`listening on ${port}`)
})