// @flow

import ReactDOM from 'react-dom';
import * as React from 'react';
import { Component } from 'react-simplified';
import { HashRouter, Route, NavLink } from 'react-router-dom';
import { Home } from './mainpages/frontPage.js';
import { Read } from './mainpages/read.js';
import { CreateArticle } from './mainpages/createArticle.js';
import { AdvSearch } from './widgets/advSearch';
import { logIn } from './mainpages/logIn';
import { Register } from './mainpages/logIn';
import { categoryList, f } from './mainpages/category';
import { CategoryArt } from './mainpages/category';
import { Newsfeed } from './widgets/newsfeed';
import { All } from './mainpages/all';
import { Alert } from './widgets/Alert';
import { UpdateArticle } from './methods/updateArticle';
import { Search } from './mainpages/search';
import { createHashHistory } from 'history';
import { SearchBar } from './widgets/searchBar';

const root = document.getElementById('root');

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
          <a className="navbar-brand home" href="#">
            Home{' '}
          </a>
          <ul className="navbar-nav">
            <li className="nav-item">
              <NavLink className="nav-link new" style={{ color: 'red' }} activeStyle={{ color: 'darkgray' }} to="/New">
                All
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                className="nav-link new_art"
                style={{ color: 'red' }}
                activeStyle={{ color: 'darkgray' }}
                to="/NewArticle"
              >
                New Article
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                className="nav-link adv_search"
                style={{ color: 'red' }}
                activeStyle={{ color: 'darkgray' }}
                to="/search"
              >
                Search
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
              <SearchBar />
            </form>
          </ul>
        </nav>
        <Newsfeed />
        <br />
      </div>
    );
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
        <Route exact path="/NewArticle" component={CreateArticle} />
        <Route exact path="/Article/:id" component={Read} />
        <Route exact path="/Article/:id/update" component={UpdateArticle} />
        <Route exact path="/search" component={AdvSearch} />
        <Route exact path="/logIn" component={logIn} />
        <Route exact path="/Register" component={Register} />
        <Route exact path="/category/:name" component={CategoryArt} />
        <Route exact path="/New" component={All} />
        <Route exact path="/search/:word" component={Search} />
        <Foot />
      </HashRouter>
    </div>,
    root
  );
