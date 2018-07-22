import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import './Home.css';

export default class Home extends Component {
  constructor() {
    super();
    this.state = {
      comicIds: {
        drStrange: 20165,
        talesOfSuspense: 66351,
        cloakAndDagger: 62791,
        defenders: 20266
      }
    }
  }

  render() {
    let {comicIds} = this.state;
    return(
      <div className='outside'>
        <div className='ad'>
          <img alt='Ant-Man' src='../../images/antman-and-wasp2.jpg'/>
        </div>
        <div className='home'>
          <div className='homeContainer'>
            <div className='hero-otw'>
              Spider-Man
            </div>
            <div className='villain-otw'>
              Scorpion
            </div>
            <div className='topics-of-interest'>
              <div className='comicLink'>
                
                <Link to={`/comic/${comicIds.drStrange}`}><span>Doctor Strange (1974) #80</span></Link>
              </div>
              <div className='comicLink'>
                
                <Link to={`/comic/${comicIds.talesOfSuspense}`}><span>Tales of Suspense (1995) #1</span></Link>
              </div>
              <div className='comicLink'>

                <Link to={`/comic/${comicIds.cloakAndDagger}`}><span>Cloak and Dagger (1985) #10</span></Link>
              </div>
              <div className='comicLink'>

                <Link to={`/comic/${comicIds.defenders}`}><span>Defenders (1972) #102</span></Link>
              </div>
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
}