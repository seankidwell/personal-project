const moment = require("moment");
module.exports = {

  logout: (req, res) => {
    req.session.destroy();
    res.redirect(`${process.env.FRONTEND_DOMAIN}/#/`)
  },

  getUserData: (req, res) => {
    if (req.session.user) {
      res.send(req.session.user)
    }
  },

  getUserInfo: (req, res) => {
    const db = req.app.get("db");
    let {userId} = req.params;
    db.retrieve_user([userId]).then(info => {
      res.send(info)
    })
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

  getPostsWithComments: (req, res) => {
    const db = req.app.get("db");
    let {userId} = req.params;
    db.retrieve_posts_with_comments([userId]).then(data => {
      let posts_obj = {};
      data.map(post => {
        if (posts_obj[post.post_id] === undefined) {
          posts_obj[post.post_id] = {
            post_id: post.post_id,
            post_title: post.post_title,
            post_content: post.post_content,
            tags: post.tags,
            post_created_at: post.post_created_at,
            post_updated_at: post.post_updated_at,
            user_id: post.the_user_id,
            user_name: post.user_name,
            comments: [{
              comment_id: post.comment_id,
              comment_content: post.comment_content,
              comment_created_at: post.comment_created_at,
              comment_updated_at: post.comment_updated_at
            }]
          }
        } else {
          posts_obj[post.post_id].comments.push({
            comment_id: post.comment_id,
            comment_content: post.comment_content,
            comment_created_at: post.comment_created_at,
            comment_updated_at: post.comment_updated_at
          })
        }
      })
      let postArray = [];
      for (var key in posts_obj) {
        postArray.push(posts_obj[key])
      }
      postArray.forEach(post => {
        post.post_updated_at = moment(post.post_updated_at).format('L')
      })
      res.send(postArray)
    })
  },

  editProfile: (req, res) => {
    const db = req.app.get("db");
    let {userId} = req.params;
    let {editedUsername, editedBio} = req.body;
    db.update_profile([editedUsername, editedBio, userId]).then(() => {
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
    let {editedTitle, editedPost, tags} = req.body;
    let {id} = req.params;
    db.update_post([editedTitle, editedPost, tags, id]).then(() => {
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

  editComment: (req, res) => {
    const db = req.app.get("db");
    let {commentId} = req.params;
    let {commentContent} = req.body;
    db.edit_comment([commentContent, commentId]).then(() => {
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