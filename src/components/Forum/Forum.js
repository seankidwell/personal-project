import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';
import {connect} from 'react-redux';
import {getUserData} from '../../redux/users';
import customClass from 'animate.css';
import swal from 'sweetalert2';
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

  goToPost(id) {
    this.props.history.push(`/post/${id}`)
  }

  signUpMessage() {
    swal({
      title: 'Whoops!',
      text: 'You must be logged in before you can create a post',
      animation: false,
      type: 'error',
      width: 290,
      confirmButtonColor: '#ed1d24',
      confirmButtonText: 'Got it',
      customClass: 'animated bounceInUp postMessage'
    })
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
            <div className='userNameAndDate'>
              <span className='detailInfo'><Link to={`/profile/${post.user_id}`}>-{post.user_name}-</Link></span>
              <span className='detailInfo'>{post.post_updated_at}</span>
            </div>
            <h1><Link to={`/post/${post.post_id}`}>{post.post_title}</Link></h1>
          </div>
        </div>
      )
    })
    return (
      <div className='forum'>
          <div className='forumPosts'>
            {mappedPosts}
          </div>
          {this.props.user.user_id?
          <Link to={'/post'}><button className='createPost'>Create Post</button></Link>:
          <button className='createPost' onClick={() => this.signUpMessage()}>Create Post</button>
          }
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