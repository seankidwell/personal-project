import React, { Component } from "react";
import axios from "axios";
import { connect } from "react-redux";
import { getUserData } from "../../redux/users";
import "./Post.css";

class Post extends Component {
  constructor() {
    super();
    this.state = {
      title: "",
      content: "",
      tagButtons: [],
      tags: [],
      user_id: null
    };
  }

  componentDidMount() {
    this.setState({ user_id: this.props.user.user_id });
  }

  changeTitle(value) {
    this.setState({ title: value });
  }

  changeContent(value) {
    this.setState({ content: value });
  }

  createPost = async () => {
    let { title, content, tags, user_id } = this.state;
    let {
      data: [newPostObj]
    } = await axios.post("/api/forum/posts", { title, content, tags, user_id });
    this.props.history.push(`/post/${newPostObj.post_id}`);
  };

  render() {
    return (
      <div className="postCreator">
        <div className="postContainer">
          <div className='postTitleSection'>
            <div>Title</div>
            <textarea
              className="titleArea"
              placeholder="title"
              onChange={e => this.changeTitle(e.target.value)}
            />
          </div>
          <br />
          <div className='postContentSection'>
            <div>Content</div>
            <textarea
              className="contentArea"
              placeholder="content"
              onChange={e => this.changeContent(e.target.value)}
            />
          </div>
          <br />
          {this.state.user_id ? (
            <button className='submitButton' onClick={this.createPost}>Submit</button>
          ) : null}
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    user: state.user
  };
}

export default connect(
  mapStateToProps,
  { getUserData }
)(Post);
