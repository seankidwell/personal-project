import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import axios from 'axios';
import './ProfilePage.css';

class ProfilePage extends Component {
  constructor() {
    super();
    this.state = {
      username: '',
      bio: '',
      image: '',
      posts: [],
      comments: [],
      postButton: true,
      commentButton: false
    }
  }

  componentDidMount() {
    axios.get(`/api/profile/info/${this.props.match.params.userId}`).then(res => {
      let {user_name, user_pic, bio} = res.data[0];
      this.setState({
        username: user_name,
        bio: bio,
        image: user_pic
      })
    })
    axios.get(`/api/profile/posts/${this.props.match.params.userId}`).then(res => {
      this.setState({posts: res.data})
    })
    axios.get(`/api/posts/comments/${this.props.match.params.userId}`).then(res => {
      this.setState({comments: res.data})
    })
  }

  changeToPosts() {
    if (this.state.postButton===false && this.state.commentButton===true) {
      this.setState({postButton: !this.state.postButton, commentButton: !this.state.commentButton})
    }
  }

  changeToComments() {
    if (this.state.commentButton===false && this.state.postButton===true) {
      this.setState({postButton: !this.state.postButton, commentButton: !this.state.commentButton})
    }
  }

  getUserId = async (id) => {
    let userId = await axios.get(`/api/profile/userId/${id}`)
    return userId;
  }
 
  render() {
    let listOfPosts = this.state.posts.map((post,i) => {
      return (
        <div key={post.post_id} className='forumPost'>
          <div className='titleTags'>
            <div className='userNameAndDate'>
              <span className='detailInfo'><Link to={`/profile/${this.props.match.params.userId}`}>-{this.state.username}-</Link></span>
              <span className='detailInfo'>{post.post_updated_at}</span>
            </div>
            <h1><Link to={`/post/${post.post_id}`}>{post.post_title}</Link></h1>
          </div>
        </div>
      )
    })
    
    let listOfPostsWithComments = this.state.comments.map((post,i) => {
      let comments = post.comments.map((comment,i) => {
        return (
          <div className='profileComment' key={i}>
            <span>{comment.comment_content}</span>
          </div>
        )
      })
      return (
        <div className='profilePostsWithComments' key={i}>
          <div className='titleTags'>
            <div className='userNameAndDate'>
              {post.user_id=this.getUserId(post.user_name)}
              {console.log(post)}
              <span className='detailInfo'><Link to={`/profile/${post.user_id}`}>-{post.user_name}-</Link></span>
              <span className='detailInfo'>{post.post_updated_at}</span>
            </div>
            <h1><Link to={`/post/${post.post_id}`}>{post.post_title}</Link></h1>
          </div>
          {comments}
        </div>
      )
    })

    return (
      <div className='profilePage'>
        <div className='basicUserInfo'>
          <div className='picAndName'>
            <img className='profilePagePic' alt='profilePic' src={this.state.image}/>
            <div className='profileUsername'>{this.state.username}</div>
            {this.props.user.user_id==this.props.match.params.userId?
            <Link to={`/profile/edit/${this.props.match.params.userId}`}><button>Edit Info</button></Link>:
            null
            }
          </div>
          <div className='bio'>
            {this.state.bio}
          </div>
        </div>
        <div className='postsCommentsButtons'><button onClick={() => this.changeToPosts()}>Posts</button><button onClick={() => this.changeToComments()}>Comments</button></div>
        {this.state.postButton===true && this.state.commentButton===false?
        <div className='profilePosts'>{listOfPosts}</div>:
        <div className='profileComments'>{listOfPostsWithComments}</div>
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

export default connect(mapStateToProps)(ProfilePage)