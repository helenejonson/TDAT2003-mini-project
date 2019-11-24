// @flow
const Dao = require('./dao');
type article = {
  title: string,
  picturePath: string,
  pictureAlt: string,
  pictureCapt: string,
  text: string,
  author: string,
  category: string,
  importance: number
};
module.exports = class ArticleDao extends Dao {
  getArticles(callback) {
    super.query('Select * from annonse order by date desc', [], callback);
  }

  getImportant(callback) {
    super.query(
      'SELECT * FROM annonse WHERE importance = 1 order by likes DESC, dislikes ASC, date desc limit 20',
      [],
      callback
    );
  }

  getNewsfeed(callback) {
    super.query('Select * from annonse order by date desc limit 5', [], callback);
  }

  getCategory(category: string, callback) {
    super.query('Select * from annonse where category = ?', [category], callback);
  }

  getArticle(id: number, callback) {
    super.query('Select * from annonse where id=?', [id], callback);
  }

  deleteArticle(id: number, callback) {
    super.query('Delete from annonse where id = ?;', [id], callback);
  }

  createArticle(
    { title, picturePath, pictureAlt, pictureCapt, text, author, category, importance }: article,
    callback
  ) {
    var val = [title, picturePath, pictureAlt, pictureCapt, text, author, category, importance];
    super.query(
      'insert into annonse ( title, picturePath, pictureAlt, pictureCapt, text, author, category, importance) values (?,?,?,?,?,?,?,?)',
      val,
      callback
    );
  }

  updateArticle(
    { title, picturePath, pictureAlt, pictureCapt, text, author, category, importance, id }: article & { id: number },
    callback
  ) {
    var val = [title, picturePath, pictureAlt, pictureCapt, text, author, category, importance, id];
    super.query(
      'UPDATE annonse SET title = ?, picturePath = ?, pictureAlt = ?, pictureCapt = ?, text = ?,author = ?, category = ?, importance = ? where id = ?',
      val,
      callback
    );
  }

  updateRating({ likes, dislikes, id }, callback) {
    var val = [likes, dislikes, id];
    super.query('UPDATE annonse SET likes = ?, dislikes = ? WHERE id = ?;', val, callback);
  }
};
