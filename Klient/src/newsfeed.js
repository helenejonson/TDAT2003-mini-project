// @flow
import * as React from 'react';
import { Component } from 'react-simplified';
import { Article } from './article';
import { databaseService } from './databaseService';

export class Newsfeed extends Component {
  articles: Article[] = [];
  mounted(): void {
    let art = databaseService.getNewsfeed().then(data => {
      this.articles = data;
    });
  }

  render() {
    let articles = this.articles;
    if (articles.length === 0) {
      return null;
    }

    return (
      <div>
        <div className="tcontainer">
          <div className="ticker-wrap">
            <div className="ticker-move">
              <div className="ticker-item">
                <div className="ticker-move">
                  {articles.map(e => (
                    <a className="newsBar" href={'#/Article/' + e.id}>
                      {e.title} / {e.date.toLocaleTimeString()}
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
