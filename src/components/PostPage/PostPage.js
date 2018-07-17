import React, {Component} from 'react';
import axios from 'axios';
import {connect} from 'react-redux';
import {getUserData} from '../../redux/users';
import './PostPage.css';

class PostPage extends Component {
  constructor() {
    super();
    this.state = {
      postId: null,
      postTitle: "",
      postContent: "",
      userId: null,
      comments: [],
      commentContent: ''
    };
  }

  componentDidMount() {
    axios.get(`/api/forum/post/${this.props.match.params.id}`).then(res => {
      console.log(res.data)
      let {post_title, post_content, user_id} = res.data[0];
      this.setState({
        postId: this.props.match.params.id,
        postTitle: post_title,
        postContent: post_content,
        userId: user_id
      })
    })
    axios.get(`/api/forum/comments/${this.props.match.params.id}`).then(res => {
      console.log(res.data)
      this.setState({
        comments: res.data
      })
    })
    axios.get('/api/user-data').then(res => {
      this.setState({userId: res.data.id})
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
          {comment.comment_content}
        </div>
      )
    })
    return (
      <div className='postPage'>
        <div className='postPageContainer'>
          <button onClick={() => this.back()}>Back</button>
          <div className='post'>
            <h1>{this.state.postTitle}:</h1>
            {this.state.postContent}
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