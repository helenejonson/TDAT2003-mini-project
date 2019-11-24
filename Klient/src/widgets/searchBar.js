// @flow

import ReactDOM from 'react-dom';
import * as React from 'react';
import { Component } from 'react-simplified';
import { HashRouter, Route, NavLink } from 'react-router-dom';
import { Home } from '../frontPage.js';
import { Read } from '../read.js';
import { CreateArticle } from '../createArticle.js';
import { AdvSearch } from './advSearch';
import { logIn } from '../logIn';
import { Register } from '../logIn';
import { categoryList, f } from '../category';
import { CategoryArt } from '../category';
import { Newsfeed } from '../newsfeed';
import { All } from '../all';
import { Alert } from './Alert';
import { UpdateArticle } from '../updateArticle';
import { Search } from '../search';
import { createHashHistory } from 'history';

const history = createHashHistory();

export class SearchBar extends Component {
  word: string = null;

  render(){
    return(
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
    )
  }
  searchArt() {
    if (this.word != null) {
      history.push('/search/' + this.word);
    } else {
      Alert.danger('Insert search value');
    }
  }
}