// @flow
import * as React from 'react';
import axios from 'axios';

export class Article {
  id: number;
  title: string;
  picturePath: string;
  pictureAlt: string;
  pictureCapt: string;
  text: string;
  date: Date;
  author: string;
  category: string;
  importance: number;

  constructor(id: number, title: string, picturePath: string, pictureAlt: string, pictureCapt: string, text: string, date: Date, author: string, category: string, importance: number) {
    this.id = id;
    this.title = title;
    this.picturePath = picturePath;
    this.pictureAlt = pictureAlt;
    this.pictureCapt = pictureCapt;
    this.text = text;
    this.date = date;
    this.author = author;
    this.category = category;
    this.importance = importance;
  }
}

class ArticleService {
  getArticles() {
    return axios.get<Article[]>('http://localhost:8080/annonse')
        .then(response => {

          return response.data.map(a =>
              new Article(a.id, a.title, a.picturePath, a.pictureAlt, a.pictureCapt, a.text, new Date(Date.parse(a.date)), a.author, a.category, a.importance))

        })
        .catch(error => console.log(error));
  }

  getArticle(id: number) {
    return axios.get<Article>('http://localhost:8080/annonse/' + id).then(response => {
        let a = response.data[0];
        console.log(a);
        return new Article(a.id, a.title, a.picturePath, a.pictureAlt, a.pictureCapt, a.text, new Date(Date.parse(a.date)), a.author, a.category, a.importance)
    })
  .catch(error => console.error(error));
  }

  updateArticle(article: Article) {
    return axios.put<Article, void>('http://localhost:8080/annonse', article).then(response => response.data);
  }

  addArticle(article: Article) {
      return axios.post<Article, void>('http://localhost:8080/annonse', article).then(response => response.data);
  }
}
export let articleService = new ArticleService();


export function getArticles() {
  var date = new Date("2017-01-26");
  var articleList =[
    new Article(2,'Name', "img/logo.png", "eeg", "Dont need dis","Do Do" , date, "Maria McC", "Movies", 2),
    new Article(3,'Name', "img/logo.png", "art", "Dont need dis","Do Do" , date, "Maria McC","D&D",1),
    new Article(3,'Name', "img/logo.png", "square", "Dont need dis","Do Do" , date, "Maria McC","D&D", 2),
  ];
  return articleList;
}