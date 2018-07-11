module.exports = {

  getAllPosts: (req, res) => {
    const db = req.app.get("db");
    db.retrieve_all_posts().then(posts => {
      res.send(posts)
    })
  },

  getPost: (req, res) => {
    const db = req.app.get("db");
    let {id} = req.params
    db.retrieve_post([id]).then(post => {
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
  }
}