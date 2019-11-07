import * as React from 'react';
import { Component, sharedComponentData } from 'react-simplified';
import {AdvancedSearch} from "./widgets";
import {ArticleCard} from "./Card";
import {Article} from "./Article";
import {databaseService } from "./DatabaseService";

export class Category{
    categoryId: number;
    name: string;
    desc: string;

    constructor(categoryId: number, name: string, desc: string){
        this.categoryId = categoryId;
        this.name = name;
        this.desc = desc;
    }
}
/*
new Category(1,'Movies', 'Blockbusters and staight to DVD. We cover all'),
    new Category(2,'Books', 'Read your way to a new favourite'),
    new Category(3,'MTG', 'All new card, lore and how-to'),
    new Category(4,'D&D', 'We play dugeons and dragons!!!'),
    new Category(5,'Anime', 'Kawaii'),
 */
export let categoryList = sharedComponentData({
    categories: [
    new Category(1,'Movies', 'Blockbusters and staight to DVD. We cover all'),
    new Category(2,'Books', 'Read your way to a new favourite'),
    new Category(3,'MTG', 'All new card, lore and how-to'),
]
});
console.log(categoryList);

export function f() {
    return databaseService.getCategoryList()
        .then(actualCategories => {
            const before = categoryList.categories.length;
            console.log(actualCategories);
            categoryList.categories.push(...actualCategories);
            categoryList.categories.splice(0, before);
        })
        .catch(err => {
            console.log("FEIL DEBUG: ", err);
        });
}




export class CategoryArt extends Component <{ match: { params: { name: string } } }>{
    desc = "";

    articles: Article[] = [];
    mounted(): void {
        let art = databaseService.getCategories(this.props.match.params.name).then(data => {
            this.articles = data;
        });
        this.getDesc();
    }

    render(){
        let articles = this.articles;
        if(articles.length === 0){
            return null;
        }


        return(
            <div>
                <h1 className="categoryTitle">{this.props.match.params.name}</h1>
                <h4 className="categoryTitle">{this.desc}</h4>
                <div className=" grid-container">
                    <AdvancedSearch/>
                    <div className='card-columns'>
                        {articles.map((a) => <ArticleCard art={a}/>)}

                    </div>
                </div>
            </div>
        )
    }

    getDesc(){
        let findDesc = categoryList.categories.find(category => category.name === this.props.match.params.name)
        if(findDesc){
            this.desc = findDesc.desc;
        }
    }
}