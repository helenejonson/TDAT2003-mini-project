// @flow

import ReactDOM from 'react-dom';
import * as React from 'react';
import { Component } from 'react-simplified';
import { HashRouter, Route, NavLink } from 'react-router-dom';
import { Home } from './frontPage.js';
import { Read } from './read.js';
import { ArticleEditor } from './ArticleEditor.js';
import { AdvSearch } from './advSearch';
import { logIn } from './logIn';
import { Register } from './logIn';
import { categoryList, f } from './Category';
import { CategoryArt } from './Category';
import { Newsfeed } from './newsfeed';
import { New } from './new';
import { Alert } from './widgets';
import { UpdateArticle } from './updateArticle';
import { Search } from './search';
import { createHashHistory } from 'history';

const root = document.getElementById('root');
const history = createHashHistory();

export class Head extends Component {
  render() {
    return (
      <div>
        <img src="img/header.png" alt="Site logo" />
      </div>
    );
  }
}

f();

export class Menu extends Component {
  word: string = null;
  render() {
    return (
      <div>
        <nav className="navbar navbar-expand navbar-dark bg-dark">
          <a className="navbar-brand" href="#">
            <img src="img/logo-small.png" alt="Home" />{' '}
          </a>
          <a className="navbar-brand" href="#">
            Home{' '}
          </a>
          <ul className="navbar-nav">
            <li className="nav-item">
              <NavLink className="nav-link" style={{ color: 'red' }} activeStyle={{ color: 'darkgray' }} to="/New">
                New
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                className="nav-link"
                style={{ color: 'red' }}
                activeStyle={{ color: 'darkgray' }}
                to="/NewArticle"
              >
                New Article
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" style={{ color: 'red' }} activeStyle={{ color: 'darkgray' }} to="/search">
                Advanced search
              </NavLink>
            </li>
            <li className="nav-item dropdown">
              <a
                className="nav-link dropdown-toggle"
                href="#"
                id="navbarDropdown"
                style={{ color: 'red' }}
                role="button"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                Category
              </a>
              <div className="dropdown-menu " aria-labelledby="navbarDropdown">
                {categoryList.categories.map(e => (
                  <div>
                    <NavLink
                      class="myList"
                      style={{ color: 'black' }}
                      activeStyle={{ color: 'gray' }}
                      to={'/category/' + e.name}
                    >
                      {e.name}
                    </NavLink>
                    <br />
                  </div>
                ))}
              </div>
            </li>
            <li className="nav-item log">
              <NavLink className="nav-link" style={{ color: 'red' }} activeStyle={{ color: 'darkgray' }} to="/logIn">
                logIn
              </NavLink>
            </li>
          </ul>
          <ul className="navbar-nav ml-auto">
            <form className="form-inline my-2 my-lg-0">
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
            </form>
          </ul>
        </nav>
        <Newsfeed />
        <br />
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

export class Foot extends Component {
  render() {
    return (
      <div>
        <div className="footer">
          <div className="footer-text">
            <h4>Contacts: </h4>
            <ul>
              <li>Creator: Helene Jonson</li>
              <li>
                E-mail:
                <a className="myLink" href="mailto:heleneyj@stud.ntnu.no?Subject=Hello%20again" target="_top">
                  {' '}
                  heleneyj@stud.ntnu.no
                </a>{' '}
              </li>
            </ul>
            <p>© 2019 Geek News</p>
          </div>
        </div>
      </div>
    );
  }
}

if (root)
  ReactDOM.render(
    <div>
      <HashRouter>
        <Route exact path="/" component={Head} />
        <Menu />
        <Alert />
        <Route exact path="/" component={Home} />
        <Route exact path="/NewArticle" component={ArticleEditor} />
        <Route exact path="/Article/:id" component={Read} />
        <Route exact path="/Article/:id/update" component={UpdateArticle} />
        <Route exact path="/search" component={AdvSearch} />
        <Route exact path="/logIn" component={logIn} />
        <Route exact path="/Register" component={Register} />
        <Route exact path="/category/:name" component={CategoryArt} />
        <Route exact path="/New" component={New} />
        <Route exact path="/search/:word" component={Search} />
        <Foot />
      </HashRouter>
    </div>,
    root
  );
