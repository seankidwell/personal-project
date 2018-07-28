import React, { Component } from "react";
import { Link } from "react-router-dom";
import autosize from "autosize";
import axios from "axios";
import "./PostPageComment.css";

export default class PostPageComment extends Component {
  constructor(props) {
    super(props);
    this.state = {
      commentEdit: false,
      commentContent: ""
    };
  }

  componentDidMount() {
    this.setState({ commentContent: this.props.comment.comment_content });
  }

  commentChange(value) {
    this.setState({ commentContent: value });
    let box = (document.getElementById("commentEdit"));
    autosize(box);
  }

  allowEdit() {
    this.setState({ commentEdit: !this.state.commentEdit });
    if (this.state.commentEdit === false) {
      this.setState({ commentContent: this.props.comment.comment_content });
    }
  }

  saveComment = async commentId => {
    let { commentContent } = this.state;
    await axios.put(`/api/forum/comment/${commentId}`, { commentContent });
    this.setState({ commentEdit: !this.state.commentEdit });
    this.props.pageLoad();
  };

  render() {
    let { comment, user, deleteComment } = this.props;
    return (
      <div className="comments">
        <div className="userNameAndDate">
          <span className="detailInfo">
            <Link to={`/profile/${comment.user_id}`}>
              -{comment.user_name}-
            </Link>
          </span>
          <span className="detailInfo">{comment.comment_updated_at}</span>
        </div>
        {this.state.commentEdit === false ? (
          <div className='postPageComment'>{comment.comment_content}</div>
        ) : (
          <textarea
            id="commentEdit"
            value={this.state.commentContent}
            onChange={e => this.commentChange(e.target.value)}
          />
        )}
        <div className="editDelete">
          {user.user_id === comment.user_id &&
          this.state.commentEdit === false ? (
            <button
              className="editDeleteButton"
              onClick={() => this.allowEdit()}
            >
              Edit
            </button>
          ) : null}
          {user.user_id === comment.user_id &&
          this.state.commentEdit === false ? (
            <button className="editDeleteButton" onClick={deleteComment}>
              Delete
            </button>
          ) : null}
          {this.state.commentEdit === true ? (
            <button
              className="editDelete"
              onClick={() => this.saveComment(comment.comment_id)}
            >
              Save
            </button>
          ) : null}
          {this.state.commentEdit === true ? (
            <button className="editDelete" onClick={() => this.allowEdit()}>
              Cancel
            </button>
          ) : null}
        </div>
      </div>
    );
  }
}
