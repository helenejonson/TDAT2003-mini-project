import * as React from 'react';
import { Component } from 'react-simplified';
import {Article} from "./Article";
import {databaseService} from "./DatabaseService";




export class Newsfeed extends Component{
    articles: Article[] = [];
    mounted(): void {
        let art = databaseService.getArticles().then(data => {
            this.articles = data;
        });
    }

    render(){
        let articles = this.articles;
        if(articles.length === 0){
            return null;
        }

        return(
            <div>
                <div className="tcontainer">
                    <div className="ticker-wrap">
                        <div className="ticker-move">
                            <div className="ticker-item">
                                <div className="ticker-move">
                                    {articles.map(e =>(

                                            <a className="newsBar" href={"#/Article/" + e.id}>{e.title}</a>

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