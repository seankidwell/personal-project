import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import axios from 'axios';
import './ProfilePage.css';

class ProfilePage extends Component {
  constructor() {
    super();
    this.state = {
      posts: [],
      comments: [],
      postButton: true
    }
  }

  componentDidMount() {
    axios.get(`/api/profile/posts/${this.props.match.params.userId}`).then(res => {
      this.setState({posts: res.data})
    })
  }

  render() {
    let listOfPosts = this.state.posts.map((post,i) => {
      return (
        <div key={post.post_id} className='forumPost'>
          <div className='titleTags'>
            <div className='userNameAndDate'>
              <span className='detailInfo'>-{this.props.user.user_name}-</span>
              <span className='detailInfo'>{post.post_updated_at}</span>
            </div>
            <h1><Link to={`/post/${post.post_id}`}>{post.post_title}</Link></h1>
          </div>
        </div>
      )
    })
    return (
      <div className='profilePage'>
        <div className='basicUserInfo'>
          <div className='picAndName'>
            <img className='profilePagePic' alt='profilePic' src={this.props.user.user_pic}/>
            <div className='profileUsername'>{this.props.user.user_name}</div>
            <Link to={`/profile/edit/${this.props.match.params.userId}`}><button>Edit Info</button></Link>
          </div>
          <div className='bio'>
            {this.props.user.bio}
          </div>
        </div>
        <div className='postsCommentsButtons'><button value={this.postButton}>Posts</button><button>Comments</button></div>
        <div className='profilePosts'>{listOfPosts}</div>
        <div className='profileComments'></div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    user: state.user
  }
}

export default connect(mapStateToProps)(ProfilePage)