// @flow

import * as React from 'react';
import { Component } from 'react-simplified';
import { ArticleCard } from './card';
import { Article } from './article';
import { Up } from '../widgets/up';

export class ArticleDispay extends Component<{ art: Article }> {
  articles: Article[] = [];

  render() {
    let articles = this.props.art;
    if (articles.length === 0) {
      return (
        <div>
          <h1 className="title">Empty? Be the first to post something new</h1>
        </div>
      );
    }
    return (
      <div>
        <div className=" grid-container">
          <Up />
          <div className="card-columns">
            {articles.map(a => (
              <ArticleCard art={a} />
            ))}
          </div>
        </div>
      </div>
    );
  }
}
