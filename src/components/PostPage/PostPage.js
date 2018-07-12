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
      title: "",
      content: "",
      userId: null,
      comments: [],
      commentContent: ''
    };
  }

  componentDidMount() {
    axios.get(`/api/forum/posts/${this.props.match.params.id}`).then(res => {
      this.setState({
        postId: res.data[0].id,
        title: res.data[0].title,
        content: res.data[0].content
      })
    })
    axios.get(`/api/forum/comments/${this.props.match.params.id}`).then(res => {
      this.setState({comments: res.data})
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
    this.props.history.push()
  }

  render() {
    let resultComments = this.state.comments.map((comment,i) => {
      return (
        <div key={comment.id}>
          {comment.content}
        </div>
      )
    })
    return (
      <div className='postPage'>
        <div className='postPageContainer'>
          <button onClick={() => this.back()}>Back</button>
          <div className='postPageTitle'>{this.state.title}</div>
          <div className='postPageContent'>{this.state.content}</div>
          <textarea className='commentContent' placeholder='comment' value={this.state.commentContent} onChange={e => this.changeCommentContent(e.target.value)}></textarea>
          <br/>
          <button onClick={() => this.createComment()}>Submit</button>
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