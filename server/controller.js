const moment = require("moment");
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

  getPostsUsingUserId: (req, res) => {
    const db = req.app.get("db");
    let {userId} = req.params;
    db.retrieve_posts_using_user_id([userId]).then(posts => {
      posts.forEach(post => {
        post.post_updated_at = moment(post.post_updated_at).format('L')
      })
      res.send(posts)
    })
  },

  editProfile: (req, res) => {
    const db = req.app.get("db");
    let {userId} = req.params;
    let {username, bio} = req.body;
    db.update_profile([username, bio, userId]).then(() => {
      res.end()
    })
  },

  getPostsWithUsers: (req, res) => {
    const db = req.app.get("db");
    db.retrieve_posts_with_users().then(posts => {
      posts.forEach(post => {
        post.post_updated_at = moment(post.post_updated_at).format('L')
      })
      res.send(posts)
    })
  },

  getPostWithUser: (req, res) => {
    const db = req.app.get("db");
    let {postId} = req.params
    db.retrieve_post_with_user([postId]).then(post => {
      post.forEach(obj => {
        obj.post_updated_at = moment(obj.post_updated_at).format('L')
      })
      res.send(post)
    })
  },
  
  createPost: (req, res) => {
    const db = req.app.get("db");
    let {title, content, tags, user_id} = req.body;
    db.create_post([title, content, tags, user_id]).then(post => {
      res.send(post)
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
      comments.forEach(comment => {
        comment.comment_updated_at = moment(comment.comment_updated_at).format('L')
      })
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
  },

  deleteComment: (req, res) => {
    const db = req.app.get("db");
    let {commentId} = req.params;
    db.delete_comment([commentId]).then(() => {
      res.end()
    })
  }
}