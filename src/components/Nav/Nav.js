import React from 'react';
import {Link} from 'react-router-dom';
import './Nav.css';

export default function Nav(props) {
  return (
    <div className='nav' onClick={props.closeNav}>
      <Link to={'/'}>Home</Link>
      <Link to={'/forum'}>Forum</Link>
    </div>
  )
}