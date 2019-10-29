// @flow

export class Article {
  id: number;
  title: string;
  picturePath: string;
  pictureAlt: string;
  pictureCapt: string;
  text: string;
  date: Date;
  author: string;

  constructor(id: number, title: string, picturePath: string, pictureAlt: string, pictureCapt: string, text: string, date: Date, author: string) {
    this.id = id;
    this.title = title;
    this.picturePath = picturePath;
    this.pictureCapt = pictureCapt;
    this.pictureAlt = pictureAlt;
    this.text = text;
    this.date = date;
    this.author = author;
  }
}

export function getArticles() {
  var date = new Date("2017-01-26");
  var articleList =[
    new Article(2,'Name', "img/logo.png", "eeg", "Dont need dis","Do Do" , date, "Maria McC" ),
    new Article(3,'Name', "img/logo.png", "art", "Dont need dis","Do Do" , date, "Maria McC" ),
    new Article(3,'Name', "img/logo.png", "square", "Dont need dis","Do Do" , date, "Maria McC" ),
  ];
  return articleList;
}
