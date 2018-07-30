import React, {Component} from 'react';
import Nav from '../Nav/Nav';
import axios from 'axios';
import {connect} from 'react-redux';
import {Link, withRouter} from 'react-router-dom';
import {getUserData} from '../../redux/users';
import marvelLogo from '../../images/marvel-logo.jpeg';
import backArrow from '../../images/backArrow.png';
import './Header.css';

class Header extends Component {
  constructor() {
    super();
    
  }

  pageLoad() {
    axios.get('/api/user-data').then(res => {
      this.props.getUserData(res.data)
    })
  }

  componentDidMount() {
    this.pageLoad();
  }

  login = () => {
    let {REACT_APP_DOMAIN, REACT_APP_CLIENT_ID} = process.env;
    let redirectUri = encodeURIComponent(`${window.origin}/auth/callback`);
    window.location = `https://${REACT_APP_DOMAIN}/authorize?client_id=${REACT_APP_CLIENT_ID}&scope=openid%20profile%20email&redirect_uri=${redirectUri}&response_type=code`;
  }

  logout = () => {
    axios.get('/api/logout')
  }

  openNav() {
    document.getElementById("mySidenav").style.width = "126px";
    document.getElementById("mySidenav").style.paddingLeft = "4px";
  }

  closeNav() {
    document.getElementById("mySidenav").style.width = "0";
    document.getElementById("mySidenav").style.paddingLeft = "0";
  }

  render() {
    return (
      <div className='header'>
        <Link to={'/'}><img alt='marvel-logo' id='marvel-logo' height='50' width='138' src={marvelLogo}/></Link>
        <div id="mySidenav" className="sidenav">
          <a href="javascript:void(0)" className="closebtn" onClick={() => this.closeNav()}>&times;</a>
          {this.props.user.user_id?
          <Link to={`/profile/${this.props.user.user_id}`} onClick={() => this.closeNav()}><img alt='profilePicture' className='headerProfilePic' src={this.props.user.user_pic}/></Link>:
          null
          }
          <div className='profile-login'>
          {this.props.user.user_id?
          <Link to={`/profile/${this.props.user.user_id}`} onClick={() => this.closeNav()}>Profile</Link>:
          null}
          {this.props.user.user_id?
          <a href={`${window.origin}/api/logout`} onClick={this.logout}>Logout</a>:
          <a onClick={this.login}>Login</a>}
          </div>
          <Nav closeNav={this.closeNav}/>
        </div>
        <span className='mobileMenu' onClick={() => this.openNav()}>&#9776;</span>
        <img alt='back' className='backArrow' src={backArrow} onClick={this.props.history.goBack}/>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    user: state.user
  }
}

export default withRouter(connect(mapStateToProps, {getUserData})(Header));