import React, { Component } from "react";
import { Link } from "react-router-dom";
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
        spiderMan: 6582
      }
    };
  }

  changeSearch(value) {
    this.setState({ search: value });
  }

  getImage() {

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
          <div className='otw'>
            <div className="hero-otw">
              <span>Hero of the Week</span>
              <br />
              <Link to={`/character/spider-man`}>
                <span>Spider-Man</span>
              </Link>
            </div>
            <div className="villain-otw">
              <span>Villain of the Week</span>
              <br />
              <Link to={`/character/thanos`}>
                <span>Thanos</span>
              </Link>
            </div>
          </div>
          <div className="topics-of-interest">
          <div className="comicCharacters">
            <div className='homeTitle'>Characters</div>
              <div className='characterTitle'>Heros</div>
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
                <div className="characterLink">
                  <Link to={`/character/gwen%20stacy`}>
                    <span>Gwen Stacy</span>
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
              </div>
              <div className='characterTitle'>Teams/Organizations</div>
              <div className='characterLinks'>
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
              </div>
            </div>
            <div className="comicBooks">
              <div className='homeTitle'>Popular Comics over the Years</div>
              <div className='years'>60's-80's</div>
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
              <div className='years'>80's-00's</div>
              <div className="comicLink">
                <Link to={`/comic/${comicIds.cloakAndDagger}`}>
                  <span>Cloak and Dagger (1985) #10</span>
                </Link>
              </div>
              <div className="comicLink">
                <Link to={`/comic/${comicIds.talesOfSuspense}`}>
                  <span>Tales of Suspense (1995) #1</span>
                </Link>
              </div>
              <div className='years'>00's-present</div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
