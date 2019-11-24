// @flow

import { Article } from './article';
import * as React from 'react';
import { Component } from 'react-simplified';
import MarkdownRenderer from 'react-markdown-renderer';
import { createHashHistory } from 'history';

export class Preview extends Component<{ art: Article }> {
  article: Article = this.props.art;

  render() {
    return (
      <div>
        {/*The dropdown preview display*/}
        <div>
          <p>
            <button
              className="btn preview-btn"
              type="button"
              data-toggle="collapse"
              data-target="#collapsePreview"
              aria-expanded="false"
              aria-controls="collapsePreview"
            >
              Preview
            </button>
          </p>
          <div className="collapse" id="collapsePreview">
            <div className="preview">
              <div className="mini-article">
                <h4 className="articleTitle"> {this.article.title} </h4>
                <figure>
                  <img className="pictureSizePreview" src={this.article.picturePath} alt={this.article.pictureAlt} />
                  <figcaption className="pictureCapt">{this.article.pictureCapt}</figcaption>
                </figure>
                <br />
                <MarkdownRenderer markdown={this.article.text} />
                <br />
                <div className="articleInfo">
                  <small> Author: {this.article.author}</small>
                  <br />
                  <small> Category: {this.article.category}</small>
                  <br />
                  <small>
                    {' '}
                    Published: {this.article.date.toDateString()} {this.article.date.getHours()}:
                    {this.article.date.getMinutes()}
                  </small>
                </div>
                <br />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
