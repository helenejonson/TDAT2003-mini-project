// @flow

import * as React from 'react';
import axios from 'axios';
import { Article } from './methods/article';
import { Comment } from './methods/comments';
import { Category } from './mainpages/category';

class DatabaseService {
  getImpArticles() {
    return axios
      .get<Article[]>('http://localhost:8080/annonse/viktig')
      .then(response => {
        let b = response.data;
        console.log(b);
        if (b.length === 0) {
          return null;
        } else {
          return response.data.map(
            a =>
              new Article(
                a.id,
                a.title,
                a.picturePath,
                a.pictureAlt,
                a.pictureCapt,
                a.text,
                new Date(Date.parse(a.date)),
                a.author,
                a.category,
                a.importance,
                a.likes,
                a.dislikes
              )
          );
        }
      })
      .catch(error => console.log(error));
  }

  getNewsfeed() {
    return axios
      .get<Article[]>('http://localhost:8080/annonse/newsfeed')
      .then(response => {
        return response.data.map(
          a =>
            new Article(
              a.id,
              a.title,
              a.picturePath,
              a.pictureAlt,
              a.pictureCapt,
              a.text,
              new Date(Date.parse(a.date)),
              a.author,
              a.category,
              a.importance,
              a.likes,
              a.dislikes
            )
        );
      })
      .catch(error => console.log(error));
  }

  getArticles() {
    return axios
      .get<Article[]>('http://localhost:8080/annonse')
      .then(response => {
        let b = response.data;
        console.log(b);
        if (b.length === 0) {
          return null;
        } else {
          return response.data.map(
            a =>
              new Article(
                a.id,
                a.title,
                a.picturePath,
                a.pictureAlt,
                a.pictureCapt,
                a.text,
                new Date(Date.parse(a.date)),
                a.author,
                a.category,
                a.importance,
                a.likes,
                a.dislikes
              )
          );
        }
      })
      .catch(error => console.log(error));
  }

  getCategories(category: string) {
    return axios
      .get<Article[]>('http://localhost:8080/annonse/category/' + category)
      .then(response => {
        return response.data.map(
          a =>
            new Article(
              a.id,
              a.title,
              a.picturePath,
              a.pictureAlt,
              a.pictureCapt,
              a.text,
              new Date(Date.parse(a.date)),
              a.author,
              a.category,
              a.importance,
              a.likes,
              a.dislikes
            )
        );
      })
      .catch(error => console.log(error));
  }

  getArticle(id: number) {
    return axios
      .get<Article>('http://localhost:8080/annonse/' + id)
      .then(response => {
        let a = response.data[0];
        console.log(a);
        if (a === undefined) {
          return null;
        } else {
          return new Article(
            a.id,
            a.title,
            a.picturePath,
            a.pictureAlt,
            a.pictureCapt,
            a.text,
            new Date(Date.parse(a.date)),
            a.author,
            a.category,
            a.importance,
            a.likes,
            a.dislikes
          );
        }
      })
      .catch(error => console.error(error));
  }

  addArticle(article: Article) {
    return axios.post<Article, void>('http://localhost:8080/annonse', article).then(response => response.data);
  }

  updateArticle(article: Article) {
    console.log(article);
    return axios.put('http://localhost:8080/annonse/update', article);
  }

  addComment(comment: Comment) {
    return axios
      .post<Article, void>('http://localhost:8080/annonse/' + comment.articleId + '/comment', comment)
      .then(response => response.data);
  }

  getComments(id: number) {
    return axios
      .get<Comment[]>('http://localhost:8080/annonse/' + id + '/comment')
      .then(response => {
        return response.data.map(
          c => new Comment(c.commentId, c.articleId, c.username, c.text, new Date(Date.parse(c.date)))
        );
      })
      .catch(error => console.log(error));
  }

  deleteArticle(id: number) {
    return axios.delete<Article, void>('http://localhost:8080/annonse/' + id);
  }

  deleteComment(articleId: number) {
    return axios.delete<Comment, void>('http://localhost:8080/annonse/' + articleId + '/comment');
  }

  updateRating(article: Article) {
    console.log('se her helene');
    return axios.put('http://localhost:8080/annonse/rating', article);
  }

  getCategoryList() {
    return axios
      .get<Category[]>('http://localhost:8080/annonse/categoryList')
      .then(response => {
        return response.data.map(c => new Category(c.categoryId, c.name, c.description));
      })
      .catch(error => console.log(error));
  }
}
export let databaseService = new DatabaseService();
