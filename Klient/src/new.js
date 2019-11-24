// @flow

import * as React from 'react';
import { Component } from 'react-simplified';
import { Alert } from './widgets';
import { Article } from './article';
import { databaseService } from './databaseService';
import { ArticleDispay } from './articleDispay';

export class New extends Component {
  articles: Article[] = [];
  mounted() {
    databaseService
      .getArticles()
      .then(data => {
        console.log(data);
        if (data === null) {
          Alert.danger('No articles in the database');
        } else {
          this.articles = data;
        }
      })
      .catch(err => {
        console.log('FEIL DEBUG: ', err);
      });
  }

  render() {
    let articles = this.articles;
    if (articles.length === 0) {
      return (
        <div>
          <h1 className="title">Empty? Be the first to post something new</h1>
        </div>
      );
    }
    return (
      <div>
        <ArticleDispay art={this.articles} />
      </div>
    );
  }
}
