import React, {Component} from 'react';
import axios from 'axios';
import {connect} from 'react-redux';
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

  render() {
    let resultComments = this.state.comments.map((comment,i) => {
      return (
        <div className='comments' key={comment.comment_id}>
          <div className='userNameAndDate'>
            <span className='detailInfo'>-{comment.user_name}-</span>
            <span className='detailInfo'>{comment.comment_updated_at}</span>
          </div>
          <div>{comment.comment_content}</div>
        </div>
      )
    })
    return (
      <div className='postPage'>
        <div className='postPageContainer'>
          <button className='backToPosts' onClick={() => this.back()}>Back to Posts</button>
          <div className='post'>
            <div className='userNameAndDate'>
              <span className='detailInfo'>-{this.state.postData.user_name}-</span>
              <span className='detailInfo'>{this.state.postData.post_updated_at}</span>
            </div>
            <h1>{this.state.postData.post_title}:</h1>
            {this.state.postData.post_content}
          </div>
          <textarea className='commentContent' placeholder='comment' value={this.state.commentContent} onChange={e => this.changeCommentContent(e.target.value)}></textarea>
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