import React from 'react';
import Nav from '../Nav/Nav';
import axios from 'axios';
import './Header.css';

export default function Header() {

  function login() {
    let {REACT_APP_DOMAIN, REACT_APP_CLIENT_ID} = process.env;
    let redirectUri = encodeURIComponent(`http://localhost:3090/auth/callback`);
    window.location = `https://${REACT_APP_DOMAIN}/authorize?client_id=${REACT_APP_CLIENT_ID}&scope=openid%20profile%20email&redirect_uri=${redirectUri}&response_type=code`;
  }

  function logout() {
    axios.get('/api/logout')
  }

  return (
    <div className='header'>
      <Nav/>
      <button className='login/out' onClick={login}>Login</button>
      <a href='http://localhost:3005/api/logout'><button className='login/out' onClick={logout}>Logout</button></a>
    </div>
  )
}