// @flow

import * as React from 'react';
import axios from 'axios';
import {Article} from "./Article";

class DatabaseService {
    getImpArticles() {
        return axios.get<Article[]>('http://localhost:8080/viktig')
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
        return axios.get<Article[]>('http://localhost:8080/annonse/' + category)
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
export let databaseService = new DatabaseService();