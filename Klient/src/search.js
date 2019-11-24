// @flow

import * as React from 'react';
import { Component } from 'react-simplified';
import { Article } from './article';
import { databaseService } from './databaseService';
import { Alert } from './widgets';
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



export class AdvancedSearch extends Component {
  // to make flow shut up
  blabla: { style: CSSStyleDeclaration } = {};
  word: string = null;

  collapse() {
    let bredde = this.blabla.style.width;
    console.log(bredde);

    if (bredde === '0px') {
      this.blabla.style.width = '100%';
    } else {
      this.blabla.style.width = '0';
    }
  }

  render() {
    return (
      <div>
        <p>
          <button className="btn btn-light" onClick={this.collapse}>Open/Close</button>
        </p>
        <div className="advancedSearch" ref={e => (this.blabla = e)}>
          <h3>Search</h3>
          <div className="form-group">
            <input
              id="title"
              className="form-control form-control-lg"
              type="text"
              placeholder="Search"
              aria-describedby="Search input"
              onChange={(event: SyntheticInputEvent<HTMLInputElement>) => (this.word = event.target.value)}
            />
          </div>

          <button type="button" onClick={this.searchArt} className="btn btn-primary">
            Search
          </button>
        </div>
      </div>
    );
  }
}