// @flow

import * as React from 'react';
import { Component } from 'react-simplified';
import { Alert } from './Alert';
import { createHashHistory } from 'history';
import 'easymde/dist/easymde.min.css';

const history = createHashHistory();

//Search method
export class AdvSearch extends Component {
  // to make flow shut up
  blabla: { style: CSSStyleDeclaration } = {};
  word: string = null;

  render() {
    return (
      <div>
        <div className="advancedSearch" ref={e => (this.blabla = e)}>
          <h3>Search</h3>
          <br />
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
          <br />
          <button type="button" onClick={this.searchArt} className="btn btn-info search">
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
