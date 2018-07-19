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
      let mappedTags = post.tags.map((tag,i) => {
        <div>{tag[i]}</div>
      })
      return(
        <div key={post.post_id} className='forumPost'>
          <div className='titleTags'>
            <span className='detailInfo'>-{post.user_name}-</span>
            <h1><Link to={`/post/${post.post_id}`}>{post.post_title}</Link></h1>
            <span className='detailInfo'>{post.post_updated_at}</span>
          </div>
          <div className='editDelete'>
            {user.user_id===post.user_id?<Link to={`/edit/${post.post_id}`}><button className='editDeleteButton'>Edit</button></Link>:null}
            <br/>
            {user.user_id===post.user_id?<button className='editDeleteButton' onClick={() => this.deletePost(post.post_id)}>Delete</button>:null}
          </div>
        </div>
      )
    })

    return (
      <div className='forum'>
        <div className='posts'>

          {mappedPosts}

          {this.props.user.user_id?<Link to={'/post'}><button className='createPost'>Create Post</button></Link>:null}
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