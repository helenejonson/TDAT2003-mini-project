import * as React from 'react';
import { Component } from 'react-simplified';
import {Menu} from "./index";
import {AdvancedSearch} from "./widgets";
import {ArticleCard} from "./Card";
import {Article} from "./Article";

export class Category{
    name: string;
    desc: string;

    constructor(name: string, desc: string){
        this.name = name;
        this.desc = desc;
    }
}

export function CategoryList (){
    let categoryList =[new Category('New', 'All new and exiting'),
        new Category('Movies', 'Blockbusters and staight to DVD. We cover all'),
        new Category('Books', 'Read your way to a new favourite'),
        new Category('MTG', 'All new card, lore and how-to'),
        new Category('D&D', 'We play Dungeons and Daragons!!!'),
        new Category('Anime', 'Kawaii'),
    ];
    return categoryList;
}

export class CategoryArt extends Component <{ match: { params: { name: string } } }>{
    name= '';
    desc= '';

    render(){
        var tag = ['Maria', 'CoolPerson', 'TellMeWhy'];
        var date = new Date("2017-01-26");
        var l =[
            new Article('Name', "img/logo.png", "eeg", "Dont need dis","Do Do" , date, "Maria McC" ),
            new Article('Name', "img/logo.png", "art", "Dont need dis","Do Do" , date, "Maria McC" ),
            new Article('Name', "img/logo.png", "square", "Dont need dis","Do Do" , date, "Maria McC" ),
        ];

        return(
            <div>
                <Menu/>
                <h1>{this.name}</h1>
                <div className="grid-container">
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
        )
    }
}