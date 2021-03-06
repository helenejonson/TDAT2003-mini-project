// @flow

import * as React from 'react';
import { Component, sharedComponentData } from 'react-simplified';
import { Article } from '../methods/article';
import { databaseService } from '../databaseService';
import { ArticleDispay } from '../methods/articleDispay';

export class Category {
  categoryId: number;
  name: string;
  desc: string;

  constructor(categoryId: number, name: string, desc: string) {
    this.categoryId = categoryId;
    this.name = name;
    this.desc = desc;
  }
}

export let categoryList = sharedComponentData({
  categories: [
    new Category(1, 'Movies', 'Blockbusters and staight to DVD. We cover all'),
    new Category(2, 'Books', 'Read your way to a new favourite'),
    new Category(3, 'MTG', 'All new card, lore and how-to')
  ]
});

export function f() {
  return databaseService
    .getCategoryList()
    .then(actualCategories => {
      const before = categoryList.categories.length;
      console.log(actualCategories);
      categoryList.categories.push(...actualCategories);
      categoryList.categories.splice(0, before);
    })
    .catch(err => {
      console.log('FEIL DEBUG: ', err);
    });
}

export class CategoryArt extends Component<{ match: { params: { name: string } } }> {
  desc = '';

  articles: Article[] = [];
  mounted(): void {
    let art = databaseService.getCategories(this.props.match.params.name).then(data => {
      this.articles = data;
    });
    this.getDesc();
  }

  render() {
    let articles = this.articles;
    if (articles.length === 0) {
      return (
        <div>
          <h1 className="title">Empty? Be the first to post :)</h1>
        </div>
      );
    }

    return (
      <div>
        <h1 className="categoryTitle">{this.props.match.params.name}</h1>
        <h4 className="categoryTitle">{this.desc}</h4>
        <ArticleDispay art={this.articles} />
      </div>
    );
  }

  getDesc() {
    let findDesc = categoryList.categories.find(category => category.name === this.props.match.params.name);
    if (findDesc) {
      this.desc = findDesc.desc;
    }
  }
}
