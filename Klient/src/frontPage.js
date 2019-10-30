import * as React from 'react';
import {Component} from "react-simplified";
import {ArticleCard, Card, imag} from "./Card";
import {AdvancedSearch} from "./widgets";
import {Menu}  from './index';
import {Head} from "./index";
import {Article, getArticles} from "./Article";
import {articleService} from "./Article";


export class Home extends Component {
    articles: Article[] = [];
    mounted(): void {
        let art = articleService.getArticles().then(data => {
            this.articles = data;
        });
    }

    render() {

    let articles = this.articles;
    if(articles.length === 0){
        return null;
    }
        return (
            <div>
                <Head/>
                <Menu/>
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