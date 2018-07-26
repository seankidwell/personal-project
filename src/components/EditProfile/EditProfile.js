import React, {Component} from 'react';
import {connect} from 'react-redux';
import axios from 'axios';
import './EditProfile.css';

class EditProfile extends Component {
  constructor() {
    super();
    this.state = {
      image: '',
      username: '',
      bio: ''
    }
  }

  componentDidMount() {
    axios.get(`/api/profile/info/${this.props.match.params.userId}`).then(res => {
      let {user_name, user_pic, bio} = res.data[0];
      this.setState({
        username: user_name,
        bio: bio
      })
    })
  }

  changeUsernameContent(value) {
    this.setState({username: value})
  }

  changeBioContent(value) {
    this.setState({bio: value})
  }

  confirm = async () => {
    let {user_id} = this.props.user;
    let {username, bio} = this.state;
    await axios.put(`/api/profile/edit/${user_id}`, {username, bio});
    this.props.history.push(`/profile/${user_id}`);
  }

  render() {
    return (
      <div className='editProfile'>
        <div>
          <span>Image</span>
        </div>
        <div className='usernameSection'>
          <div>Username:</div>
          <textarea className='usernameContent' placeholder='text' value={this.state.username} onChange={e => this.changeUsernameContent(e.target.value)}/>
        </div>
        <div className='bioSection'>
          <div>Bio:</div>
          <textarea className='bioContent' placeholder='text' value={this.state.bio} onChange={e => this.changeBioContent(e.target.value)}/>
        </div>
        <button className='profileConfirm' onClick={this.confirm}>Confirm</button>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    user: state.user
  }
}

export default connect(mapStateToProps)(EditProfile)