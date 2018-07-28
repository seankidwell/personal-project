import React, {Component} from 'react';
import axios from 'axios';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import {getUserData} from '../../redux/users';
import PostPageComment from '../PostPageComment/PostPageComment';
import customClass from 'animate.css'
import swal from 'sweetalert2';
import './PostPage.css';

class PostPage extends Component {
  constructor() {
    super();
    this.state = {
      postData: {},
      postId: null,
      postEdit: false,
      editedTitle: '',
      editedPost: '',
      userId: null,
      comments: [],
      commentContent: ''
    };
  }

  pageLoad = async () => {
    let {data: [postData]} = await axios.get(`/api/forum/post/${this.props.match.params.id}`)
    this.setState({
      postData: postData,
      editedTitle: postData.post_title,
      editedPost: postData.post_content,
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

  componentDidMount() {
    this.pageLoad();
  }

  async createComment() {
    let {commentContent, userId, postId} = this.state;
    await axios.post(`/api/forum/comments/${postId}`, {commentContent, userId});
    this.setState({commentContent: ''});
    this.componentDidMount();
  }

  allowEdit() {
    this.setState({postEdit: !this.state.postEdit})
    console.log(this.state.postData)
    let {post_title, post_content} = this.state.postData;
    if (this.state.postEdit===false) {
      this.setState({editedTitle: post_title, editedPost: post_content})
    }
  }

  editPost = async () => {
    let {tags} = this.state.postData;
    let {editedTitle, editedPost} = this.state;
    let {id} = this.props.match.params;
    await axios.put(`/api/forum/posts/${id}`, {editedTitle, editedPost, tags});
    this.setState({postEdit: !this.state.postEdit})
    this.pageLoad();
  };

  changePostTitle(value) {
    this.setState({editedTitle: value})
  }

  changePostContent(value) {
    this.setState({editedPost: value})
  }

  deletePost = (id) => {
    axios.delete(`/api/forum/posts/${id}`).then(res => {
      this.props.history.push('/forum')
    })
  }

  deleteComment(commentId) {
    axios.delete(`/api/forum/comment/${commentId}`).then(res => {
      this.componentDidMount();
    })
  }

  signUpMessage() {
    swal({
      title: 'Whoops!',
      text: 'You must be logged in before you can leave a comment',
      animation: false,
      type: 'error',
      width: 290,
      confirmButtonColor: '#ed1d24',
      confirmButtonText: 'Got it',
      customClass: 'animated bounceInUp commentMessage'
    })
  }

  render() {
    let {user} = this.props;
    let resultComments = this.state.comments.map((comment,i) => {
      return (
        <div key={comment.comment_id}>
          <PostPageComment comment={comment} user={user} deleteComment={() => this.deleteComment(comment.comment_id)} pageLoad={this.pageLoad}/>
        </div>
      )
    })
    return (
      <div className='postPage'>
        <div className='postPageContainer'>
          <div className='post'>
            <div className='userNameAndDate'>
              <span className='detailInfo'><Link to={`/profile/${this.state.postData.user_id}`}>-{this.state.postData.user_name}-</Link></span>
              <span className='detailInfo'>{this.state.postData.post_updated_at}</span>
            </div>
            {this.state.postEdit===false?
            <div className='postPageProfilePost'>
            <h1>{this.state.postData.post_title}:</h1>
            <div>{this.state.postData.post_content}</div>
            </div>:
            <div>
            <textarea id='postPageTitle' value={this.state.editedTitle} onChange={e => this.changePostTitle(e.target.value)}/>
            <br/>
            <textarea id='postPageContent' value={this.state.editedPost} onChange={e => this.changePostContent(e.target.value)}/>
            </div>
            }
            <div className='editDelete'>
            {user.user_id===this.state.postData.user_id && this.state.postEdit===false?<button className='editDeleteButton' onClick={() => this.allowEdit()}>Edit</button>:null}
            {user.user_id===this.state.postData.user_id && this.state.postEdit===false?<button className='editDeleteButton' onClick={() => this.deletePost(this.state.postId)}>Delete</button>:null}
            {this.state.postEdit===true?<button className='editDeleteButton' onClick={() => this.editPost()}>Confirm</button>:null}
            {this.state.postEdit===true?<button className='editDeleteButton' onClick={() => this.allowEdit()}>Cancel</button>:null}
            </div>
          </div>
          <textarea className='commentContent' placeholder='leave a comment' value={this.state.commentContent} onChange={e => this.changeCommentContent(e.target.value)}/>
          <br/>
          {this.props.user.user_id?
          <button className='submitButton' onClick={() => this.createComment()}>Submit</button>:
          <button className='submitButton' onClick={() => this.signUpMessage()}>Submit</button>
          }
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