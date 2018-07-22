import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';
import './CharacterPage.css';

export default class CharacterPage extends Component {
  constructor() {
    super();
    this.state = {
      characterName: '',
      characterImage: '',
      characterDescription: '',
      characterComics: []
    }
  }

  componentDidMount() {
    const urlStart = 'http://gateway.marvel.com/v1/public/characters/';
    const urlEnd = '?ts=1&apikey=abbb5ba81bf1d08c76fb30abc133b7fb&hash=5d8724bda4570f53616f63b789c6f6bd';
    axios.get(`${urlStart}${this.props.match.params.characterId}${urlEnd}`).then(res => {
      let {name, thumbnail, description} = res.data.data.results[0];
      console.log(res.data.data.results[0])
      this.setState({
        characterName: name,
        characterImage: thumbnail.path,
        characterDescription: description
      })
    })
  }

  render() {
    return (
      <div className='characterPage'>
        <img alt='characterImage' className='characterImage' src={`${this.state.characterImage}/portrait_incredible.jpg`} />
        <h1 className='characterName'>{this.state.characterName}</h1>
        <div className='characterDescription'>
        <div>Description: </div>
        {this.state.characterDescription}
        </div>
      </div>
    )
  }
}