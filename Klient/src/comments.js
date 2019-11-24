// @flow

import * as React from 'react';
import { Component } from 'react-simplified';
import { databaseService } from './databaseService';
import axios from 'axios';
import { Article } from './article';

export class Comment {
  commentId: number;
  articleId: number;
  username: string;
  text: string;
  date: Date;

  constructor(commentId: number, articleId: number, username: string, text: string, date: Date) {
    this.commentId = commentId;
    this.articleId = articleId;
    this.username = username;
    this.text = text;
    this.date = date;
  }
}

export class Comments extends Component<{ id: number }> {
  shouldUpdate: boolean = false;
  comment: Comment = new Comment(1, this.props.id, 'myUsername', 'myText', new Date());
  comments: Comment[] = [];

  updateComments() {
    databaseService.getComments(this.props.id).then(data => {
      this.comments = data;
    });
  }

  mounted(): void {
    this.updateComments();
  }

  render() {
    if (this.shouldUpdate) {
      this.updateComments();
      this.shouldUpdate = false;
    }
    return (
      <div>
        <p>
          <button
            className="btn btn-primary"
            type="button"
            data-toggle="collapse"
            data-target="#collapseExample"
            aria-expanded="false"
            aria-controls="collapseExample"
          >
            Add comment
          </button>
        </p>
        <div className="collapse" id="collapseExample">
          <div className="form-group">
            <input
              className="form-control"
              type="text"
              placeholder="Username"
              aria-label="username"
              onChange={(event: SyntheticInputEvent<HTMLInputElement>) => (this.comment.username = event.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="inputComment">Comment</label>
            <textarea
              className="form-control"
              id="inputComment"
              placeholder="Comment..."
              rows="3"
              onChange={(event: SyntheticInputEvent<HTMLInputElement>) => (this.comment.text = event.target.value)}
            ></textarea>
          </div>
          <button type="button" className="btn btn-primary" onClick={this.commentUpload}>
            Publish
          </button>
        </div>
        <div className="comment-boxes">
          {this.comments
            ? this.comments.map(e => (
                <div className="comments-box">
                  <h5>{e.username}</h5>
                  <p>{e.text}</p>
                  <small>{e.date.toLocaleString()}</small>
                </div>
              ))
            : null}
        </div>
        <br />
      </div>
    );
  }

  commentUpload() {
    console.log(this.comment);
    databaseService
      .addComment(this.comment)
      .then(d => (this.shouldUpdate = true))
      .catch(e => console.error(e));
  }
}
