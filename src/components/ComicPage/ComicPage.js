import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';
import {Circle} from 'better-react-spinkit';
import './ComicPage.css';

export default class ComicPage extends Component {
  constructor() {
    super();
    this.state = {
      comicTitle: '',
      comicImage: '',
      comicDescription: '',
      comicCharacters: [],
      comicCreators: [],
    }
  }

  componentDidMount() {
    const urlStart = 'https://gateway.marvel.com/v1/public/comics/';
    const urlEnd = '?ts=1&apikey=abbb5ba81bf1d08c76fb30abc133b7fb&hash=5d8724bda4570f53616f63b789c6f6bd';
    axios.get(`${urlStart}${this.props.match.params.comicId}${urlEnd}`).then(res => {
      let {images, description, title, characters, creators, comics} = res.data.data.results[0]
      this.setState({
        comicTitle: title,
        comicImage: images[0].path,
        comicDescription: description,
        comicCharacters: characters.items,
        comicCreators: creators.items
      })
    })
  }

  render() {
    let listOfCharacters = this.state.comicCharacters.map((character,i) => {
      return(
        <span key={i}>
          <Link to={`/character/${character.name}`}>{character.name}{this.state.comicCharacters.length-1!==i?', ':null}</Link>
        </span>
      )
    })
    let listOfCreators = this.state.comicCreators.map((creator,i) => {
      return(
        <li className='comicCreator' key={i}>{creator.name} - {creator.role} </li>
      )
    })
    return (
      <div className='comicPage'>
        {this.state.comicImage ? (
          <div>
            <img alt='comicCover' className='comicCover' src={`${this.state.comicImage}/portrait_incredible.jpg`}/>
            <h1 className='comicTitle'>{this.state.comicTitle}</h1>
            <div className='comicDescription'>
            <div>Description: </div>
            {this.state.comicDescription}
            </div>
            <div className='comicCreatorsContainer'>
              <span>Creators:</span>
              <div className='comicCreators'>{listOfCreators}</div>
            </div>
            <div className='relatedCharactersContainer'>
              <div className='relatedCharacters'>Related Characters:</div>
              {listOfCharacters}
            </div>
          </div>
        ) : (
          <Circle className='loader' size={100} scaleEnd={.1} scaleStart={.7}/>
        )}
      </div>
    )
  }
}