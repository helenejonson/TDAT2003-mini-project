// @flow

import * as React from 'react';
import { Component } from 'react-simplified';
import { Alert } from './Alert';
import { createHashHistory } from 'history';

const history = createHashHistory();

export class SearchBar extends Component {
  word: string = null;

  render() {
    return (
      <div>
        <input
          className="form-control mr-sm-2 searchInput"
          type="search"
          placeholder="Search"
          aria-label="Search"
          onChange={(event: SyntheticInputEvent<HTMLInputElement>) => (this.word = event.target.value)}
        />
        <button className="btn btn-outline-success my-2 my-sm-0" type="submit" onClick={this.searchArt}>
          Search
        </button>
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
