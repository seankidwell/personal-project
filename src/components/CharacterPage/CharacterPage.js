import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import characterDescription from './characterDiscription.json';
import "./CharacterPage.css";

export default class CharacterPage extends Component {
  constructor() {
    super();
    this.state = {
      characterName: "",
      characterImage: "",
      characterDescription: "",
      characterComics: []
    };
  }

  componentDidMount() {
    let urlStart = "https://gateway.marvel.com/v1/public/characters?name=";
    let urlEnd =
      "&ts=1&apikey=abbb5ba81bf1d08c76fb30abc133b7fb&hash=5d8724bda4570f53616f63b789c6f6bd";
    axios
      .get(`${urlStart}${this.props.match.params.characterName}${urlEnd}`)
      .then(res => {
        if (res.data.data.results[0]) {
          let { name, thumbnail, description } = res.data.data.results[0];
          this.setState({
            characterName: name,
            characterImage: thumbnail.path,
            characterDescription: description
          });
        }
      });
  }

  render() {
    let decURI = decodeURIComponent(this.props.match.params.characterName)
    return (
      <div className="characterPage">
        {this.state.characterName ? (
          <div>
            <img
              alt="characterImage"
              className="characterImage"
              src={`${this.state.characterImage}/portrait_incredible.jpg`}
            />
            <h1 className="characterName">{this.state.characterName}</h1>
            <div className="characterDescription">
              <div>Description: </div>
              {characterDescription[decURI]? characterDescription[decURI].description: this.state.characterDescription}
            </div>
          </div>
        ) : (
          <span>Sorry, character could not be found :(</span>
        )}
      </div>
    );
  }
}
