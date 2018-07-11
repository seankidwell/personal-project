import React, {Component} from 'react';
import axios from 'axios';
import './Post.css'

export default class Post extends Component {
  constructor() {
    super();
    this.state = {
      title: '',
      content: '',
      tags: [],
      user_id: null
    }
  }

  componentDidMount() {
    axios.get(`/api/forum/posts/${this.props.match.params.id}`).then(res => {
      this.setState({
        title: res.data[0].title,
        content: res.data[0].content,
        tags: res.data[0].tags
      })
    })
  }

  changeTitle(value) {
    this.setState({title: value})
  }

  changeContent(value) {
    this.setState({content: value})
  }

  createPost = async () => {
    let {title, content, tags, user_id} = this.state;
    await axios.post('/api/forum/posts', {title, content, tags, user_id});
    this.props.history.push("/forum")
  }

  render() {
    return (
      <div className='postCreator'>
        <div className='postContainer'>
          <textarea className='titleArea' placeholder='title' onChange={e => this.changeTitle(e.target.value)}/>
          <br/>
          <textarea className='contentArea' placeholder='content' onChange={e => this.changeContent(e.target.value)}/>
          <br/>
          <button onClick={this.createPost}>Post</button>
        </div>
      </div>
    )
  }
}