import React, {Component} from 'react';
import axios from 'axios';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import {getUserData} from '../../redux/users';
import './PostPage.css';

class PostPage extends Component {
  constructor() {
    super();
    this.state = {
      postData: {},
      postId: null,
      userId: null,
      comments: [],
      commentContent: ''
    };
  }

  componentDidMount = async () => {
    let {data: [postData]} = await axios.get(`/api/forum/post/${this.props.match.params.id}`)
    this.setState({
      postData: postData,
      postId: this.props.match.params.id
      })
    axios.get(`/api/forum/comments/${this.props.match.params.id}`).then(res => {
      this.setState({
        comments: res.data
      })
    })
    axios.get('/api/user-data').then(res => {
      this.setState({userId: res.data.user_id})
    })
  }

  changeCommentContent(value) {
    this.setState({commentContent: value})
  }

  async createComment() {
    let {commentContent, userId, postId} = this.state;
    await axios.post(`/api/forum/comments/${postId}`, {commentContent, userId});
    this.setState({commentContent: ''});
    this.componentDidMount();
  }

  back() {
    this.props.history.push('/forum')
  }

  deletePost(id) {
    axios.delete(`/api/forum/posts/${id}`).then(res => {
      this.props.history.push('/forum')
    })
  }

  allowEdit(comment) {
    comment.edit=!comment.edit
    console.log(comment.edit)
  }

  deleteComment(commentId) {
    axios.delete(`/api/forum/comment/${commentId}`).then(res => {
      this.componentDidMount();
    })
  }

  render() {
    let {user} = this.props;
    let resultComments = this.state.comments.map((comment,i) => {
      console.log(this.state.comments)
      return (
        <div className='comments' key={comment.comment_id}>
          <div className='userNameAndDate'>
            <span className='detailInfo'><Link to={`/profile/${comment.user_id}`}>-{comment.user_name}-</Link></span>
            <span className='detailInfo'>{comment.comment_updated_at}</span>
          </div>
          <div contentEditable={comment.edit}>{comment.comment_content}</div>
          <div className='editDelete'>
            {user.user_id===comment.user_id?<button className='editDeleteButton' onClick={() => this.allowEdit(comment)}>Edit</button>:null}
            {user.user_id===comment.user_id?<button className='editDeleteButton' onClick={() => this.deleteComment(comment.comment_id)}>Delete</button>:null}
            </div>
        </div>
      )
    })
    return (
      <div className='postPage'>
        <div className='postPageContainer'>
          <button className='backToPosts' onClick={() => this.back()}>Back to Posts</button>
          <div className='post'>
            <div className='userNameAndDate'>
              <span className='detailInfo'><Link to={`/profile/${this.state.postData.user_id}`}>-{this.state.postData.user_name}-</Link></span>
              <span className='detailInfo'>{this.state.postData.post_updated_at}</span>
            </div>
            <h1>{this.state.postData.post_title}:</h1>
            {this.state.postData.post_content}
            <div className='editDelete'>
            {user.user_id===this.state.postData.user_id?<Link to={`/edit/${this.state.postId}`}><button className='editDeleteButton'>Edit</button></Link>:null}
            {user.user_id===this.state.postData.user_id?<button className='editDeleteButton' onClick={() => this.deletePost(this.state.postId)}>Delete</button>:null}
            </div>
          </div>
          <textarea className='commentContent' placeholder='comment' value={this.state.commentContent} onChange={e => this.changeCommentContent(e.target.value)}/>
          <br/>
          <button className='submitButton' onClick={() => this.createComment()}>Submit</button>
          {resultComments}
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

export default connect(mapStateToProps, {getUserData})(PostPage)