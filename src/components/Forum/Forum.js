import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';
import {connect} from 'react-redux';
import {getUserData} from '../../redux/users';
import './Forum.css';

class Forum extends Component {
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
    axios.get('/api/user-data').then(res => {
      this.props.getUserData(res.data)
    })
  }

  deletePost(id) {
    axios.delete(`/api/forum/posts/${id}`).then(res => {
      this.componentDidMount()
    })
  }

  goToPost(id) {
    this.props.history.push(`/post/${id}`)
  }

  render() {
    let {user} = this.props;
    let {posts} = this.state;
    let mappedPosts = posts.map((post,i) => {
      return(
        <div key={post.id} className='post'>
          <h1 className='postTitle' onClick={() => this.goToPost(post.id)}>{post.title}</h1>
          <div className='postContent'>{post.content}</div>
          {user.id===post.user_id?<Link to={`/edit/${post.id}`}><button>Edit</button></Link>:null}
          {user.id===post.user_id?<button onClick={() => this.deletePost(post.id)}>Delete</button>:null}
        </div>
      )
    })

    return (
      <div className='forum'>
        <div className='posts'>

          {mappedPosts}

          {this.props.user.id?<Link to={'/post'}><button>Create Post</button></Link>:null}
        </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    user: state.user
  }
}

export default connect(mapStateToProps, {getUserData})(Forum)