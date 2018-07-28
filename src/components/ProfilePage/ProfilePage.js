import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import autosize from 'autosize';
import ReactS3Uploader from 'react-s3-uploader';
import Dropzone from 'react-dropzone';
import {v4 as randomString} from 'uuid';
import {GridLoader} from 'react-spinners';
import axios from 'axios';
import './ProfilePage.css';

class ProfilePage extends Component {
  constructor() {
    super();
    this.state = {
      username: '',
      bio: '',
      image: '',
      profileEdit: false,
      editedUsername: '',
      editedBio: '',
      posts: [],
      comments: [],
      postButton: true,
      commentButton: false,
      isUploading: false
    }
  }

  pageLoad() {
    axios.get(`/api/profile/info/${this.props.match.params.userId}`).then(res => {
      let {user_name, user_pic, bio} = res.data[0];
      this.setState({
        username: user_name,
        bio: bio,
        image: user_pic,
        editedUsername: user_name,
        editedBio: bio,
        postButton: true,
        commentButton: false
      })
    })
    axios.get(`/api/profile/posts/${this.props.match.params.userId}`).then(res => {
      this.setState({posts: res.data})
    })
    axios.get(`/api/posts/comments/${this.props.match.params.userId}`).then(res => {
      this.setState({comments: res.data})
    })
  }

  componentDidMount() {
    this.pageLoad();
  }

  componentDidUpdate(prevProps) {
    if (this.props.match.params.userId===prevProps.match.params.userId) {
      null
    } else {
      this.pageLoad()
    }
  }

  allowEdit() {
    this.setState({ profileEdit: !this.state.profileEdit });
    if (this.state.profileEdit===false) {
      this.setState({
        editedUsername: this.state.username,
        editedBio: this.state.bio
      })
    }
  }

  changeUsername(value) {
    this.setState({editedUsername: value})
  }

  changeBio(value) {
    this.setState({editedBio: value})
    let box = (document.getElementById("profileBioContent"));
    autosize(box);
  }

  confirm = async () => {
    let {editedUsername, editedBio} = this.state;
    await axios.put(`/api/profile/edit/${this.props.match.params.userId}`, {editedUsername, editedBio});
    this.setState({profileEdit: !this.state.profileEdit})
    this.componentDidMount();
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

  getSignedRequest = ([file]) => {
   this.setState({isUploading: true})

   const fileName = `${randomString()}-${file.name.replace(/\s/g, '-')}`

   axios.get('/sign-s3', {
     params: {
       'file-name': fileName,
       'file-type': file.type
     }
   }).then( (response) => {
     const { signedRequest, url } = response.data 
     this.uploadFile(file, signedRequest, url)
   }).catch( err => {
     console.log(err)
   })
  }

  uploadFile = (file, signedRequest, url) => {
    
    var options = {
      headers: {
        'Content-Type': file.type
      }
    };

    axios.put(signedRequest, file, options)
    .then( response => {
      this.setState({isUploading: false, url: url})
      // THEN DO SOMETHING WITH THE URL. SEND TO DB USING POST REQUEST OR SOMETHING
    })
    .catch( err => {
      this.setState({
        isUploading: false
      })
      if(err.response.status === 403) {
        alert('Your request for a signed URL failed with a status 403. Double check the CORS configuration and bucket policy in the README. You also will want to double check your AWS_ACCESS_KEY_ID and AWS_SECRET_ACCESS_KEY in your .env and ensure that they are the same as the ones that you created in the IAM dashboard. You may need to generate new keys\n' + err.stack)
      } else {
        alert(`ERROR: ${err.status}\n ${err.stack}`)
      }
    })
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
            {this.state.profileEdit===true?
            <Dropzone 
                onDropAccepted={this.getSignedRequest}
                style={{
                position: 'relative',
                width: 125,
                height: 125,
                borderWidth: 7,
                borderColor: 'rgb(102, 102, 102)',
                borderStyle: 'dashed',
                borderRadius: 5,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                fontSize: 28,
                }}
                accept='image/*'
                multiple={false} >
                
                { this.state.isUploading 
                    ?  <GridLoader />
                    : <p>Select Image</p>
                }

            </Dropzone>:
            <img className='profilePagePic' alt='profilePic' src={this.state.image}/>}
            {this.state.profileEdit===false?
            <div className='profileUsername'>{this.state.username}</div>:
            <textarea id='profileUsernameContent' value={this.state.editedUsername} onChange={e => this.changeUsername(e.target.value)}/>
            }
            <div className='profileConfirmCancel'>
              {this.props.user.user_id==this.props.match.params.userId && this.state.profileEdit===false?
              <button onClick={() => this.allowEdit()}>Edit Profile</button>:
              null
              }
              {this.state.profileEdit===true?<button onClick={this.confirm} className='profilePageConfirm'>Confirm</button>:null}
              {this.state.profileEdit===true?<button onClick={() => this.allowEdit()}>Cancel</button>:null}
            </div>
          </div>
          <div className='bio'>
            {this.state.profileEdit===false?
            <div className='setBio'>{this.state.bio}</div>:
            <textarea id='profileBioContent' value={this.state.editedBio} onChange={e => this.changeBio(e.target.value)}/>
            }
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