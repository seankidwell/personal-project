import React from 'react';
import './Home.css';

export default function Home() {

  const urlEnd = '1009459?ts=1&apikey=abbb5ba81bf1d08c76fb30abc133b7fb&hash=5d8724bda4570f53616f63b789c6f6bd';

  return (
    <div className='outside'>
      <div className='ad'>
        <img alt='Ant-Man' src='../../images/antman-and-wasp2.jpg'/>
      </div>
      <div className='home'>
        <div className='homeContainer'>
        <div className='hero-otw'>
          <img alt='spiderman' src='https://i.pinimg.com/originals/17/80/b9/1780b98d94b547fb3449d183c26d2bd5.jpg'/>
          Spider-Man
        </div>
        <div className='villain-otw'>
          Scorpion
        </div>
        <div className='topics-of-interest'>
        <div>comics</div>
        <div>comics</div>
        <div>story line</div>
        <div>some character</div>
        <div>story line</div>
        <div>some cahracter</div>
        </div>
        </div>
      </div>
    </div>
  )
}