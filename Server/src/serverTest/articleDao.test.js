// @flow

var mysql = require('mysql');

const ArticleDao = require('../database/articleDao.js');

var pool = mysql.createPool({
  connectionLimit: 1,
  host: 'mysql',
  user: 'root',
  password: 'secret',
  database: 'supertestdb',
  debug: false,
  multipleStatements: true
});

let articleDao = new ArticleDao(pool);

test('get all articles from db', done => {
  function callback(status, data) {
    console.log('Test callback: status=' + status + ', data.length=' + data.length);
    expect(data.length).toBeGreaterThanOrEqual(4);
    done();
  }

  articleDao.getArticles(callback);
});

test('get all important articles from db', done => {
  function callback(status, data) {
    console.log('Test callback: status=' + status + ', data.length=' + data.length);
    expect(data.length).toBe(3);
    done();
  }

  articleDao.getImportant(callback);
});

test('get full newsfeed from db', done => {
  function callback(status, data) {
    console.log('Test callback: status=' + status + ', data.length=' + data.length);
    expect(data.length).toBeGreaterThanOrEqual(4);
    done();
  }

  articleDao.getNewsfeed(callback);
});

test('get all articles in category from db', done => {
  function callback(status, data) {
    console.log('Test callback: status=' + status + ', data.length=' + data.length);
    expect(data.length).toBe(2);
    done();
  }

  articleDao.getCategory('D&D', callback);
});

test('get one article from db', done => {
  function callback(status, data) {
    console.log('Test callback status=' + status + ', data=' + JSON.stringify(data));
    expect(data.length).toBe(1);
    expect(data[0].title).toBe('tittel 1');
    done();
  }

  articleDao.getArticle(1, callback);
});

test('delete one', done => {
  var before = -1;
  articleDao.getArticles(some);

  function some(status, data) {
    console.log('Test callback: status=' + status + ', data.length=' + data.length);
    before = data.length;
    articleDao.deleteArticle(2, callback);
  }

  function callback(status, data) {
    console.log('Test callback: status=' + status + ', data.length=' + JSON.stringify(data));
    expect(data.affectedRows).toBe(1);
    articleDao.getArticles(after);
  }

  function after(status, data) {
    console.log('Test callback: status=' + status + ', data.length=' + data.length);
    expect(data.length).toBe(before - 1);
    done();
  }
});

test('add article to db', done => {
  function callback(status, data) {
    console.log('Test callback: status=' + status + ', data=' + JSON.stringify(data));
    expect(data.affectedRows).toBeGreaterThanOrEqual(1);
    done();
  }

  articleDao.createArticle(
    {
      title: 'All title',
      picturePath: 'All path',
      pictureAlt: 'All alt',
      pictureCapt: 'All capt',
      text: 'All text',
      author: 'My Name',
      category: 'Movies',
      importance: 2
    },
    callback
  );
});

test('update rating', done => {
  function callback(status, data) {
    console.log('Test callback: status=' + status + ', data=' + JSON.stringify(data));
    expect(data.affectedRows).toBeGreaterThanOrEqual(1);
    done();
  }

  articleDao.updateRating({ likes: 2, dislikes: 1, id: 1 }, callback);
});

test('update article', done => {
  function callback(status, data) {
    console.log('Test callback: status=' + status + ', data=' + JSON.stringify(data));
    expect(data.affectedRows).toBeGreaterThanOrEqual(1);
    done();
  }

  articleDao.updateArticle(
    {
      title: 'All Title',
      picturePath: 'All picturePath',
      pictureAlt: 'All pictureAlt',
      pictureCapt: 'All pictureCapt',
      text: 'Updated Text',
      author: 'ME',
      category: 'D&D',
      importance: 1,
      id: 4
    },
    callback
  );
});

test('Ask for none-existent article from db', done => {
  function callback(status, data) {
    console.log('Test callback: status=' + status + ', data=' + JSON.stringify(data));
    expect(data.length).toBe(0);
    done();
  }

  articleDao.getArticle(0, callback);
});
