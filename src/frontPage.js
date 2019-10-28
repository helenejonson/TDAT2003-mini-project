import * as React from 'react';
import {Component} from "react-simplified";
import {ArticleCard, Card, imag} from "./Card";
import {Article} from "./Article"
import {AdvancedSearch} from "./widgets";
import {Menu}  from './index';
import {Head} from "./index";


export class Home extends Component {
    render() {
        var tag = ['Maria', 'CoolPerson', 'TellMeWhy'];
        var date = new Date("2017-01-26");

        var l =[
            new Article("Oh no they comin!", "img/logo.png", "eeg", "Dont need dis","Do Do" , date, "Maria McC" ),
            new Article("Oh they comin!", "img/logo.png", "art", "Dont need dis","Do Do" , date, "Maria McC" ),
            new Article("Oh no they comin!", "img/logo.png", "square", "Dont need dis","Do Do" , date, "Maria McC" ),
        ];

        return (
            <div>
                <Head/>
                <Menu/>
            <div class="grid-container">
                <AdvancedSearch/>
                <div className="left">
                    <ArticleCard art={l[0]}/>
                    <ArticleCard art={l[1]}/>
                    <ArticleCard art={l[2]}/>
                </div>
                <div className="middle">
                    <ArticleCard art={l[0]}/>
                    <ArticleCard art={l[1]}/>
                    <ArticleCard art={l[2]}/>
                </div>
                <div className="right">
                    <ArticleCard art={l[0]}/>
                    <ArticleCard art={l[1]}/>
                    <ArticleCard art={l[2]}/>
                </div>

            </div>
            </div>
        );
    }
}