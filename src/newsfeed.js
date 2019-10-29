import * as React from 'react';
import { Component } from 'react-simplified';
import {getArticles} from "./Article";


var l = getArticles();

export class Newsfeed extends Component{
    render(){

        return(
            <div>
                <div className="tcontainer">
                    <div className="ticker-wrap">
                        <div className="ticker-move">
                            <div className="ticker-item">
                                <div className="ticker-move">
                                    {l.map(e =>(

                                            <a className="newsBar" href="#/Article">{e.title}</a>

                                        )
                                    )}
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

/*
<div>
                <nav className="navbar navbar-expand navbar-light bg-light">
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <a className="nav-link" href="#">
                                {l.map(e =>(
                                        <div>
                                            <NavLink class="myList" style={{color: 'black'}} activeStyle={{ color: "gray" }} to={"/Article"}>
                                                {e.title} {e.date}
                                            </NavLink>
                                            <br/>
                                        </div>
                                    )
                                )}
                            </a>
                        </li>
                    </ul>
                </nav>
            </div>
 */