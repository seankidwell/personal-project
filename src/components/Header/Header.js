import React, {Component} from 'react';
import Nav from '../Nav/Nav';
import axios from 'axios';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import {getUserData} from '../../redux/users';
import './Header.css';

class Header extends Component {
  constructor() {
    super();
    
  }

  componentDidMount() {
    axios.get('/api/user-data').then(res => {
      this.props.getUserData(res.data)
    })
  }

  login = () => {
    let {REACT_APP_DOMAIN, REACT_APP_CLIENT_ID} = process.env;
    let redirectUri = encodeURIComponent(`http://localhost:3090/auth/callback`);
    window.location = `https://${REACT_APP_DOMAIN}/authorize?client_id=${REACT_APP_CLIENT_ID}&scope=openid%20profile%20email&redirect_uri=${redirectUri}&response_type=code`;
  }

  logout = () => {
    axios.get('/api/logout')
  }

  render() {
    return (
      <div className='header'>
        <img alt='marvel-logo' className='marvel-logo' height='73' width='138' src='http://1000logos.net/wp-content/uploads/2017/08/Marvel-Logo.png'/>
        <div className='nav-login'>
          <Nav/>
          <div className='profile/login'>
          {this.props.user.user_id?
          <Link to={`/profile/${this.props.user.user_id}`}><button>Profile</button></Link>:
          null}
          {this.props.user.user_id?
          <a href='http://localhost:3090/api/logout'><button className='login/out' onClick={this.logout}>Logout</button></a>:
          <button className='login/out' onClick={this.login}>Login</button>}
          </div>
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

export default connect(mapStateToProps, {getUserData})(Header);