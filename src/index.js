// @flow

import ReactDOM from 'react-dom';
import * as React from 'react';
import {Component} from 'react-simplified';
import {HashRouter, Route, NavLink} from 'react-router-dom';
import {Home } from './frontPage.js';
import {Read} from './read.js';
import {ArticleEditor } from './ArticleEditor.js';
import {AdvancedSearch2} from './widgets.js'
import {logIn} from './logIn';
import {Register} from './logIn';
import {CategoryList} from "./Category";
import {CategoryArt} from "./Category";
import {Newsfeed} from "./newsfeed";


const root = document.getElementById('root');


export class Head extends Component {

    render(){
        return (
            <div>
                <img src="img/header.png" alt="Site logo"/>
            </div>
        )
    }
}


let category = CategoryList();



export class Menu extends Component {
    render() {
        return (
            <div>
                <nav className="navbar navbar-expand navbar-dark bg-dark">
                    <a className="navbar-brand" href="#" ><img src="img/logo-small.png" alt="Home"/> </a>
                    <a className="navbar-brand" href="#" >Home </a>
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <a className="nav-link" href="#">
                                <NavLink style={{color: 'white'}} activeStyle={{ color: 'gray' }} to="/NewArticle">
                                    New Article
                                </NavLink>
                            </a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="#">
                                <NavLink style={{color: 'white'}} activeStyle={{ color: "gray" }} to="/search">
                                   Advanced search
                                </NavLink>
                            </a>
                        </li>
                        <li className="nav-item dropdown">
                            <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" style={{color: 'white'}}  role="button"
                               data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                Category
                            </a>
                            <div className="dropdown-menu " aria-labelledby="navbarDropdown">
                                {category.map(e =>(
                                    <div>
                                    <NavLink class="myList" style={{color: 'black'}} activeStyle={{ color: "gray" }} to={"/category/" + e.name}>
                                        {e.name}
                                    </NavLink>
                                        <br/>
                                    </div>
                                    )
                                )}
                            </div>
                        </li>
                        <li className="nav-item log">
                            <a className="nav-link" href="#" >
                                <NavLink style={{color: 'white'}} activeStyle={{ color: "gray" }} to="/logIn">
                                    logIn
                                </NavLink>
                            </a>
                        </li>
                    </ul>
                </nav>
                <Newsfeed/>
                <br/>
                <br/>
            </div>
        );
    }
}

export class Foot extends Component{
    render(){
        return(
            <div>
                <div className="footer">
                    <h4>Contacts: </h4>
                    <ul>
                        <li>Creator: Helene Jonson</li>
                        <li>E-mail:
                            <a className="myLink" href="mailto:heleneyj@stud.ntnu.no?Subject=Hello%20again" target="_top"> heleneyj@stud.ntnu.no</a> </li>
                    </ul>
                    <p>© 2019 Geek News</p>
                </div>
            </div>

        );
    }
}



if (root)
  ReactDOM.render(
      <div>
        <HashRouter>
            <Route exact path="/" component={Home} />
            <Route exact path="/NewArticle" component={ArticleEditor} />
            <Route exact path="/Article" component={Read} />
            <Route exact path="/search" component={AdvancedSearch2} />
            <Route exact path="/logIn" component={logIn} />
            <Route exact path="/Register" component={Register} />
            <Route exact path="/category/:name" component={CategoryArt} />
            <Foot/>
        </HashRouter>
      </div>, root

  );

