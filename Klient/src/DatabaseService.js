// @flow

import * as React from 'react';
import axios from 'axios';
import {Article} from "./Article";
import {Comment} from "./Comments";
import {Rating} from "./Rating";

class DatabaseService {
    getImpArticles() {
        return axios.get<Article[]>('http://localhost:8080/annonse/viktig')
            .then(response => {

                return response.data.map(a =>
                    new Article(a.id, a.title, a.picturePath, a.pictureAlt, a.pictureCapt, a.text, new Date(Date.parse(a.date)), a.author, a.category, a.importance))

            })
            .catch(error => console.log(error));
    }

    getNewsfeed() {
        return axios.get<Article[]>('http://localhost:8080/annonse/newsfeed')
            .then(response => {

                return response.data.map(a =>
                    new Article(a.id, a.title, a.picturePath, a.pictureAlt, a.pictureCapt, a.text, new Date(Date.parse(a.date)), a.author, a.category, a.importance))

            })
            .catch(error => console.log(error));
    }

    getArticles() {
        return axios.get<Article[]>('http://localhost:8080/annonse')
            .then(response => {

                return response.data.map(a =>
                    new Article(a.id, a.title, a.picturePath, a.pictureAlt, a.pictureCapt, a.text, new Date(Date.parse(a.date)), a.author, a.category, a.importance))

            })
            .catch(error => console.log(error));
    }

    getCategories(category: string) {
        return axios.get<Article[]>('http://localhost:8080/annonse/category/' + category)
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

    addComment(comment: Comment) {
        return axios.post<Article, void>('http://localhost:8080/annonse/' + comment.articleId +'/comment', comment).then(response => response.data);
    }

    getComments(id: number) {
        return axios.get<Comment[]>('http://localhost:8080/annonse/' + id + '/comment').then(response => {

            return response.data.map(c =>
                new Comment(c.commentId, c.articleId, c.username,c.text,new Date(Date.parse(c.date))))

        })
            .catch(error => console.log(error));
    }

    deleteArticle(id: number) {
        return axios.delete<Article, void>('http://localhost:8080/annonse/' + id);
    }

    getRating(id: number) {
        return axios.get<Rating>('http://localhost:8080/annonse/' + id + '/rating').then(response => {
            let r = response.data[0];
            return new Rating(r.ratingId, r.articleId, r.likes,r.dislikes)
        })
            .catch(error => console.log(error));
    }

    addRating(rating: Rating) {
        return axios.post<Article, void>('http://localhost:8080/annonse/rating', rating).then(response => response.data);
    }

    updateRating(rating: Rating) {
        console.log('se her helene');
        return axios.put('http://localhost:8080/annonse/rating', rating);
    }
}
export let databaseService = new DatabaseService();