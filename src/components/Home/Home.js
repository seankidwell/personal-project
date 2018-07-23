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
      },
      characterIds: {
        wolverine: 1009718,
        hulk: 1009351
      }
    }
  }

  render() {
    let {comicIds, characterIds} = this.state;
    return(
      <div className='home'>
        <div className='homeContainer'>
          <div className='hero-otw'>
            <span>Hero of the Week</span>
            <br/>
            <span>Spider-Man</span>
          </div>
          <div className='villain-otw'>
            <span>Villain of the Week</span>
            <br/>
            <span>Thanos</span>
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
            <div className='characterLink'>
              
            <Link to={`/character/${characterIds.wolverine}`}><span>Wolverine</span></Link>
            </div>
            <div>story line</div>
            <div className='characterLink'>
              
            <Link to={`/character/${characterIds.hulk}`}><span>Hulk</span></Link>
            </div>
          </div>
        </div>
      </div>
    )
  }
}