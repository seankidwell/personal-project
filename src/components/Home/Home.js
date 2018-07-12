import React, {Component} from 'react';
import axios from 'axios';

export default class Home extends Component {
  constructor() {
    super();
    this.state = {

    }
  }
  componentDidMount() {
    axios.get('/api/user-data')
  }
  render() {
    return (
      <div>Home</div>
    )
  }
}