// @flow

import * as React from 'react';
import { Component } from 'react-simplified';
import { Article } from './article';
import { databaseService } from './databaseService';
import { Alert } from './widgets/Alert';
import { ArticleCard } from './card';
import { createHashHistory } from 'history';
import 'easymde/dist/easymde.min.css';

const history = createHashHistory();

export class Search extends Component<{ match: { params: { word: string } } }> {
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

    articles = articles.filter(e => e.title.includes(this.props.match.params.word));
    if (articles.length != 0) {
      return (
        <div>
          <h1 className="title"> Your search for "{this.props.match.params.word}" gave results</h1>
          <div className="card-columns">
            {articles.map(a => (
              <ArticleCard art={a} />
            ))}
          </div>
        </div>
      );
    } else {
      return (
        <div>
          <h1 className="title"> Your search for "{this.props.match.params.word}" gave no result </h1>
        </div>
      );
    }
  }
}


