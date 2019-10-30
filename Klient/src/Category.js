import * as React from 'react';
import { Component } from 'react-simplified';
import {Head, Menu} from "./index";
import {AdvancedSearch} from "./widgets";
import {ArticleCard} from "./Card";
import {Article} from "./Article";
import {databaseService } from "./DatabaseService";

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


    articles: Article[] = [];
    mounted(): void {
        let art = databaseService.getCategories(this.props.match.params.name).then(data => {
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
                <Head/>
                <Menu/>
                <div className=" grid-container">
                    <AdvancedSearch/>
                    <div className='card-columns'>
                        {articles.map((a) => <ArticleCard art={a}/>)}

                    </div>
                </div>
            </div>
        )
    }
}