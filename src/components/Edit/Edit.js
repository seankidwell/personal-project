import React, { Component } from "react";
import axios from "axios";
import "./Edit.css";

export default class Edit extends Component {
  constructor() {
    super();
    this.state = {
      title: "",
      content: "",
      tags: [],
      user_id: null
    };
  }

  componentDidMount() {
    axios.get(`/api/forum/posts/${this.props.match.params.id}`).then(res => {
      this.setState({
        title: res.data[0].title,
        content: res.data[0].content,
        tags: res.data[0].tags
      });
    });
  }

  changeTitle(value) {
    this.setState({ title: value });
  }

  changeContent(value) {
    this.setState({ content: value });
  }

  editPost = async () => {
    let { title, content, tags} = this.state;
    let {id} = this.props.match.params;
    await axios.put(`/api/forum/posts/${id}`, { title, content, tags});
    this.props.history.push("/forum");
  };

  render() {
    return (
      <div className="editCreator">
        <div className="editContainer">
          <textarea
            className="titleArea"
            placeholder="title"
            value={this.state.title}
            onChange={e => this.changeTitle(e.target.value)}
          />
          <br />
          <textarea
            className="contentArea"
            placeholder="content"
            value={this.state.content}
            onChange={e => this.changeContent(e.target.value)}
          />
          <br />
          <button onClick={this.editPost}>Submit</button>
        </div>
      </div>
    );
  }
}
