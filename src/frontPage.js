import * as React from 'react';
import {Component} from "react-simplified";
import {ArticleCard, Card, imag} from "./Card";
import {AdvancedSearch} from "./widgets";
import {Menu}  from './index';
import {Head} from "./index";
import {getArticles} from "./Article";


export class Home extends Component {
    render() {

        var articles = getArticles();

        return (
            <div>
                <Head/>
                <Menu/>

            <div class="grid-container">
                <AdvancedSearch/>
                <div className="left">
                    <ArticleCard art={articles[0]}/>
                    <ArticleCard art={articles[1]}/>
                    <ArticleCard art={articles[2]}/>
                </div>
                <div className="middle">
                    <ArticleCard art={articles[0]}/>
                    <ArticleCard art={articles[1]}/>
                    <ArticleCard art={articles[2]}/>
                </div>
                <div className="right">
                    <ArticleCard art={articles[0]}/>
                    <ArticleCard art={articles[1]}/>
                    <ArticleCard art={articles[2]}/>
                </div>

            </div>
            </div>
        );
    }
}