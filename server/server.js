const express = require("express");
const bodyParser = require("body-parser");
const session = require("express-session");
const massive = require("massive");
const axios = require("axios");
const aws = require('aws-sdk')
const controller = require("./controller");
const path = require("path");
require("dotenv").config();

const app = express();
const port = 3090;

app.use(express.static(__dirname+'/../build'));

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

const {
    S3_BUCKET,
    AWS_ACCESS_KEY_ID,
    AWS_SECRET_ACCESS_KEY
} = process.env

app.get('/api/sign-s3', (req, res) => {
  console.log('get hit')

  aws.config = {
    region: 'us-west-1',
    accessKeyId: AWS_ACCESS_KEY_ID,
    secretAccessKey: AWS_SECRET_ACCESS_KEY
  }
  
  const s3 = new aws.S3();
  const fileName = req.query['file-name'];
  const fileType = req.query['file-type'];
  const s3Params = {
    Bucket: S3_BUCKET,
    Key: fileName,
    Expires: 60,
    ContentType: fileType,
    ACL: 'public-read'
  };

  s3.getSignedUrl('putObject', s3Params, (err, data) => {
    if(err){
      console.log(err);
      return res.end();
    }
    console.log(data)
    const returnData = {
      signedRequest: data,
      url: `https://${S3_BUCKET}.s3.amazonaws.com/${fileName}`
    };

    return res.send(returnData)
  });
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
    res.redirect(`${process.env.FRONTEND_DOMAIN}/#/`);
  } else {
    db.create_user([sub, name, picture]).then(createdUser => {
      req.session.user = createdUser[0];
      res.redirect(`${process.env.FRONTEND_DOMAIN}/#/`);
    });
  }
});

app.get("/api/logout", controller.logout);

app.get("/api/user-data", controller.getUserData);

app.get("/api/profile/info/:userId", controller.getUserInfo);
app.get("/api/profile/posts/:userId", controller.getPostsUsingUserId);
app.get("/api/posts/comments/:userId", controller.getPostsWithComments);

app.put("/api/profile/edit/:userId", controller.editProfile);
app.post("/api/profile/picture/:userId", controller.updatePicture);

app.get("/api/forum/posts", controller.getPostsWithUsers);
app.get("/api/forum/post/:postId", controller.getPostWithUser);
app.post("/api/forum/posts", controller.createPost);
app.put("/api/forum/posts/:id", controller.editPost);
app.delete("/api/forum/posts/:id", controller.deletePost);

app.get("/api/forum/comments/:postId", controller.getCommentsWithUsers);
app.delete("/api/forum/comment/:commentId", controller.deleteComment);
app.put("/api/forum/comment/:commentId", controller.editComment);

app.post("/api/forum/comments/:postId", controller.createComment);

app.get("*", (req, res) => {
  res.sendFile(path.resolve(`${__dirname}/../build/index.html`))
})

app.listen(port, () => {
  console.log(`listening on ${port}`);
});
