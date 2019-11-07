import * as React from 'react';
import {Component} from "react-simplified";
import {ArticleCard, Card, imag} from "./Card";
import {AdvancedSearch} from "./widgets";
import {Article} from "./Article";
import {databaseService} from "./DatabaseService";


export class Home extends Component {
    articles: Article[] = [];
    mounted(): void {
        databaseService.getImpArticles().then(data => {
            this.articles = data;
        }).catch(err => {
            console.log("FEIL DEBUG: ", err);
        });
    }

    render() {

    let articles = this.articles;
    if(articles.length === 0){
        return null;
    }
        return (
            <div>
            <div className=" grid-container">
                <AdvancedSearch/>
                <div className='card-columns'>
                    {articles.map((a) => <ArticleCard art={a}/>)}

                </div>
            </div>
            </div>
        );
    }
}