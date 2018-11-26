import React, { Component } from "react";
import { Link } from "react-router-dom";
import spiderMan from '../../images/spider-man2.jpg';
import thanos from '../../images/thanos.jpg';
import "./Home.css";

export default class Home extends Component {
  constructor() {
    super();
    this.state = {
      search: "",
      comicIds: {
        drStrange: 20165,
        talesOfSuspense: 66351,
        cloakAndDagger: 62791,
        defenders: 20266,
        manThing: 70832,
        fantasticFour: 12894,
        avengers: 6964,
        spiderMan: 6582,
        spiderMan2: 43225,
        thunderBolts: 15325,
        spiderMan3: 70099,
        moonKnight: 58050,
        punisher: 27580,
        newMutants: 26057,
        x: 27962,
        xFactor: 3150,
        blackPanther: 65268,
        captainMarvel: 65271
      }
    };
  }

  changeSearch(value) {
    this.setState({ search: value });
  }

  render() {
    let { comicIds, search } = this.state;
    function upperCase(str) {
      var splitStr = str.toLowerCase().split(' ');
      for (var i = 0; i < splitStr.length; i++) {
        splitStr[i] = splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);
      }
      return splitStr.join(' ');
    }
    return (
      <div className="home">
        <div className="homeContainer">
          <div className="characterSearch">
            <div>Character Search</div>
            <input
              placeholder="search"
              onChange={e => this.changeSearch(e.target.value)}
            />
            <Link to={`/character/${encodeURIComponent(upperCase(search))}`}><button>Go</button></Link>
          </div>
          <div className='otwTitle'>Hero/Villain of the Week</div>
          <div className='otw'>
            <div className='otwContainer'>
              <span>Spider-Man</span>
              <Link to={`/character/Spider-Man`}><img className='otwPicture' alt='spider-man' src={spiderMan} height='190' width='125'/></Link>
            </div>
            <div className='otwContainer'>
              <span>Thanos</span>
              <Link to={`/character/Thanos`}><img className='otwPicture' alt='thanos' src={thanos} height='190' width='125'/></Link>
            </div>
          </div>
          <div className="topics-of-interest">
          <div className="comicCharacters">
            <div className='homeTitle'>Characters of Interest</div>
              <div className='characterTitle'>Heroes</div>
              <div className='characterLinks'>
                <div className="characterLink">
                  <Link to={`/character/wolverine`}>
                    <span>Wolverine</span>
                  </Link>
                </div>
                <div className="characterLink">
                  <Link to={`/character/colleen%20wing`}>
                    <span>Colleen Wing</span>
                  </Link>
                </div>
                <div className="characterLink">
                  <Link to={`/character/hulk`}>
                    <span>Hulk</span>
                  </Link>
                </div>
                <div className="characterLink">
                  <Link to={`/character/daredevil`}>
                    <span>Daredevil</span>
                  </Link>
                </div>
                <div className="characterLink">
                  <Link to={`/character/vision`}>
                    <span>Vision</span>
                  </Link>
                </div>
                <div className="characterLink">
                  <Link to={`/character/ben%20reilly`}>
                    <span>Ben Reilly</span>
                  </Link>
                </div>
                <div className="characterLink">
                  <Link to={`/character/storm`}>
                    <span>Storm</span>
                  </Link>
                </div>
                <div className="characterLink">
                  <Link to={`/character/wiccan`}>
                    <span>Wiccan</span>
                  </Link>
                </div>
              </div>
              <div className='characterTitle'>Villains</div>
              <div className='characterLinks'>
                <div className="characterLink">
                  <Link to={`/character/silver%20sable`}>
                    <span>Silver Sable</span>
                  </Link>
                </div>
                <div className="characterLink">
                  <Link to={`/character/Mysterio`}>
                    <span>Mysterio</span>
                  </Link>
                </div>
                <div className="characterLink">
                  <Link to={`/character/Ultron`}>
                    <span>Ultron</span>
                  </Link>
                </div>
                <div className="characterLink">
                  <Link to={`/character/Mystique`}>
                    <span>Mystique</span>
                  </Link>
                </div>
                <div className="characterLink">
                  <Link to={`/character/Sabretooth`}>
                    <span>Sabretooth</span>
                  </Link>
                </div>
                <div className="characterLink">
                  <Link to={`/character/Kingpin`}>
                    <span>Kingpin</span>
                  </Link>
                </div>
                <div className="characterLink">
                  <Link to={`/character/Ronan`}>
                    <span>Ronan</span>
                  </Link>
                </div>
                <div className="characterLink">
                  <Link to={`/character/Carnage`}>
                    <span>Carnage</span>
                  </Link>
                </div>
              </div>
              <div className='characterTitle'>Teams/Organizations</div>
              <div className='teamLinks'>
                <div className="characterLink">
                  <Link to={`/character/Avengers`}>
                    <span>Avengers</span>
                  </Link>
                </div>
                <div className="characterLink">
                  <Link to={`/character/Defenders`}>
                    <span>Defenders</span>
                  </Link>
                </div>
                <div className="characterLink">
                  <Link to={`/character/S.h.i.e.l.d.`}>
                    <span>S.H.I.E.L.D.</span>
                  </Link>
                </div>
                <div className="characterLink">
                  <Link to={`/character/Fantastic%20Four`}>
                    <span>Fantastic Four</span>
                  </Link>
                </div>
                <div className="characterLink">
                  <Link to={`/character/Guardians%20of%20the%20Galaxy`}>
                    <span>Guardians of the Galaxy</span>
                  </Link>
                </div>
                <div className="characterLink">
                  <Link to={`/character/X-Men`}>
                    <span>X-Men</span>
                  </Link>
                </div>
              </div>
            </div>
            <div className="comicBooks">
              <div className='homeTitle'>Popular Comics over the Years</div>
              <div className='years'>60's-70's</div>
              <div className="comicLink">
                <Link to={`/comic/${comicIds.fantasticFour}`}>
                  <span>Fantastic Four (1961) #1</span>
                </Link>
              </div>
              <div className="comicLink">
                <Link to={`/comic/${comicIds.avengers}`}>
                  <span>Avengers (1963) #11</span>
                </Link>
              </div>
              <div className="comicLink">
                <Link to={`/comic/${comicIds.spiderMan}`}>
                  <span>The Amazing Spider-Man (1963) #19</span>
                </Link>
              </div>
              <div className="comicLink">
                <Link to={`/comic/${comicIds.defenders}`}>
                  <span>Defenders (1972) #102</span>
                </Link>
              </div>
              <div className="comicLink">
                <Link to={`/comic/${comicIds.drStrange}`}>
                  <span>Doctor Strange (1974) #80</span>
                </Link>
              </div>
              <div className="comicLink">
                <Link to={`/comic/${comicIds.manThing}`}>
                  <span>Man-Thing (1979) #2</span>
                </Link>
              </div>
              <div className='years'>80's-90's</div>
              <div className="comicLink">
                <Link to={`/comic/${comicIds.moonKnight}`}>
                  <span>Moon Knight (1980) #15</span>
                </Link>
              </div>
              <div className="comicLink">
                <Link to={`/comic/${comicIds.cloakAndDagger}`}>
                  <span>Cloak and Dagger (1985) #10</span>
                </Link>
              </div>
              <div className="comicLink">
                <Link to={`/comic/${comicIds.spiderMan3}`}>
                  <span>Web of Spider-Man Annual (1985) #4</span>
                </Link>
              </div>
              <div className="comicLink">
                <Link to={`/comic/${comicIds.talesOfSuspense}`}>
                  <span>Tales of Suspense (1995) #1</span>
                </Link>
              </div>
              <div className="comicLink">
                <Link to={`/comic/${comicIds.thunderBolts}`}>
                  <span>Thunderbolts (1997) #22</span>
                </Link>
              </div>
              <div className="comicLink">
                <Link to={`/comic/${comicIds.spiderMan2}`}>
                  <span>Spider-Man: Chapter One (1998) #3</span>
                </Link>
              </div>
              <div className='years'>00's-present</div>
              <div className="comicLink">
                <Link to={`/comic/${comicIds.xFactor}`}>
                  <span>X-Factor (2005) #2</span>
                </Link>
              </div>
              <div className="comicLink">
                <Link to={`/comic/${comicIds.punisher}`}>
                  <span>Punisher (2008) #12</span>
                </Link>
              </div>
              <div className="comicLink">
                <Link to={`/comic/${comicIds.newMutants}`}>
                  <span>New Mutants (2009) #8</span>
                </Link>
              </div>
              <div className="comicLink">
                <Link to={`/comic/${comicIds.x}`}>
                  <span>What If? Astonishing X-Men (2009) #1</span>
                </Link>
              </div>
              <div className="comicLink">
                <Link to={`/comic/${comicIds.blackPanther}`}>
                  <span>Black Panther (2016) #168</span>
                </Link>
              </div>
              <div className="comicLink">
                <Link to={`/comic/${comicIds.captainMarvel}`}>
                  <span>The Mighty Captain Marvel (2017) #127</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
