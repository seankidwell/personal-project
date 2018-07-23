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
    let {user_name, bio} = this.props.user;
    this.setState({
      username: user_name,
      bio: bio
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
        <div>Image Select</div>
        <div>
          <span>Username</span>
          <br/>
          <textarea className='usernameContent' placeholder='text' value={this.state.username} onChange={e => this.changeUsernameContent(e.target.value)}/>
        </div>
        <div>
          <span>Bio</span>
          <br/>
          <textarea className='bioContent' placeholder='text' value={this.state.bio} onChange={e => this.changeBioContent(e.target.value)}/>
        </div>
        <button onClick={this.confirm}>Confirm</button>
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