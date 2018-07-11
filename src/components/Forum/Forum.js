import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';
import './Forum.css'

export default class Forum extends Component {
  constructor() {
    super();
    this.state = {
      posts: []
    }
  }

  componentDidMount() {
    axios.get('/api/forum/posts').then(res => {
      this.setState({posts: res.data})
    })
  }

  deletePost(id) {
    axios.delete(`/api/forum/posts/${id}`).then(res => {
      this.componentDidMount()
    })
  }

  render() {
    let {posts} = this.state;
    let mappedPosts = posts.map((post,i) => {
      return(
        <div key={post.id} className='post'>
          <h1 className='postTitle'>{post.title}</h1>
          <div className='postContent'>{post.content}</div>
          <Link to={`/post/${post.id}`}><button>Edit</button></Link>
          <button onClick={() => this.deletePost(post.id)}>Delete</button>
        </div>
      )
    })

    return (
      <div className='forum'>
        <div className='posts'>

          {mappedPosts}

          <Link to={'/post'}><button>Create Post</button></Link>
        </div>
      </div>
    )
  }
}