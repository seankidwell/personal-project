import React from 'react';
import {Link} from 'react-router-dom';
import './Nav.css';

export default function Nav() {
  return (
    <div className='nav'>
      <Link to={'/'}>Home</Link>
      <Link to={'/forum'}>Forum</Link>
      <Link to={'/store'}>Store</Link>
    </div>
  )
}