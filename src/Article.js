// @flow

export class Article {
  title: string;
  picturePath: string;
  pictureAlt: string;
  pictureCapt: string;
  text: string;
  date: Date;
  author: string;

  constructor(title: string, picturePath: string, pictureAlt: string, pictureCapt: string, text: string, date: Date, author: string) {
    this.title = title;
    this.picturePath = picturePath;
    this.pictureCapt = pictureCapt;
    this.pictureAlt = pictureAlt;
    this.text = text;
    this.date = date;
    this.author = author;
  }
}
