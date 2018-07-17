module.exports = {

  logout: (req, res) => {
    req.session.destroy();
    res.redirect('http://localhost:3000/#/')
  },

  getUserData: (req, res) => {
    if (req.session.user) {
      res.send(req.session.user)
    }
  },

  getPostsWithUsers: (req, res) => {
    const db = req.app.get("db");
    db.retrieve_posts_with_users().then(posts => {
      res.send(posts)
    })
  },

  getPostWithUser: (req, res) => {
    const db = req.app.get("db");
    let {postId} = req.params
    db.retrieve_post_with_user([postId]).then(post => {
      res.send(post)
    })
  },
  
  createPost: (req, res) => {
    const db = req.app.get("db");
    let {title, content, tags, user_id} = req.body;
    db.create_post([title, content, tags, user_id]).then(() => {
      res.end()
    })
  },

  editPost: (req, res) => {
    const db = req.app.get("db");
    let {title, content, tags} = req.body;
    let {id} = req.params;
    db.update_post([title, content, tags, id]).then(() => {
      res.end()
    })
  },

  deletePost: (req, res) => {
    const db = req.app.get("db");
    let {id} = req.params;
    db.delete_post([id]).then(() => {
      res.end()
    })
  },

  getCommentsWithUsers: (req, res) => {
    const db = req.app.get("db");
    let {postId} = req.params;
    db.retrieve_comments_with_users([postId]).then(comments => {
      res.send(comments)
    })
  },

  createComment: (req, res) => {
    const db = req.app.get("db");
    let {postId} = req.params;
    let {commentContent, userId} = req.body;
    db.create_comment([commentContent, userId, postId]).then(() => {
      res.end()
    })
  }
}