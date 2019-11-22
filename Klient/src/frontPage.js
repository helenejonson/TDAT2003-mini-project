// @flow
import * as React from 'react';
import { Component } from 'react-simplified';
import { ArticleCard, Card, imag } from './Card';
import { AdvancedSearch, Up, Alert } from './widgets';
import { Article } from './Article';
import { databaseService } from './DatabaseService';

export class Home extends Component {
  articles: Article[] = [];
  mounted() {
    databaseService
      .getImpArticles()
      .then(data => {
        console.log(data);
        if (data === null) {
          Alert.danger('No Important articles in the database');
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
