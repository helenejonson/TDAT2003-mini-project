// @flow

import * as React from 'react';
import { Component } from 'react-simplified';
import { Article } from './Article';
import { databaseService } from './DatabaseService';
import { Alert } from './widgets';
import { ArticleCard } from './Card';
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
    if(articles.length != 0){
      return (
        <div>
          <h1 className="title"> Your search for {this.props.match.params.word}</h1>
          <div className="card-columns">
            {articles.map(a => (
              <ArticleCard art={a} />
            ))}
          </div>
        </div>
      );
    }else{
      return(
        <div>
          <h1 className="title"> Your search for {this.props.match.params.word} gave no result </h1>
        </div>
      )

    }

  }
}

export class AdvSearch extends Component {
  // to make flow shut up
  blabla: { style: CSSStyleDeclaration } = {};
  word: string = null;

  render() {
    return (
      <div>
        <div className="advancedSearch2" ref={e => (this.blabla = e)}>
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

  searchArt() {
    if (this.word != null) {
      history.push('/search/' + this.word);
    } else {
      Alert.danger('Insert search value');
    }
  }
}
