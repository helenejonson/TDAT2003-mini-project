// @flow
import * as React from 'react';

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
  likes: number;
  dislikes: number;

  constructor(
    id: number,
    title: string,
    picturePath: string,
    pictureAlt: string,
    pictureCapt: string,
    text: string,
    date: Date,
    author: string,
    category: string,
    importance: number,
    likes: number,
    dislikes: number
  ) {
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
    this.likes = likes;
    this.dislikes = dislikes;
  }
}

