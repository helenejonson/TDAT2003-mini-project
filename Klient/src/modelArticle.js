// @flow

import { Article } from './article';
import * as React from 'react';
import { Component } from 'react-simplified';
import MarkdownRenderer from 'react-markdown-renderer';
import { databaseService } from './databaseService';
import { Comments } from './comments';
import { Delete } from './delete';

export class ModelArticle extends Component<{ art: Article }> {
  render() {
    return (
      <div>
        <div className="preview">
          <h1 className="articleTitle"> {this.props.art.title} </h1>
          <figure>
            <img className="pictureSize" src={this.props.art.picturePath} alt={this.props.art.pictureAlt} />
            <figcaption className="pictureCapt">{this.props.art.pictureCapt}</figcaption>
          </figure>
          <br />

          <MarkdownRenderer markdown={this.props.art.text} />
          <br />
          <div className="articleInfo">
            <small> Author: {this.props.art.author}</small>
            <br />
            <small> Published: {this.props.art.date.toLocaleString()}</small>
          </div>
          <br />
          <div className="rating">
            <p>Rating</p>
            <button type="button" className="btn btn-success like">
              Like
            </button>
            <button type="button" className="btn btn-danger dislike">
              Dislike
            </button>
            <p>
              Likes: {this.props.art.likes} Dislikes: {this.props.art.dislikes}
            </p>
          </div>
          <Comments id={this.props.art.id} />
        </div>
        <button type="submit" className="btn btn-primary" onClick={this.handleUpload}>
          Upload
        </button>
      </div>
    );
  }

  handleUpload() {
    console.log(this.article);
    databaseService.addArticle(this.article).catch(e => console.error(e));
  }
}
