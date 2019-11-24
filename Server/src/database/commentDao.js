// @flow
const Dao = require('./dao');
type comment = { articleId: number, username: string, text: string };

module.exports = class CommentDao extends Dao {
  getComments(articleId: number, callback) {
    super.query('Select * from comments where articleId = ? order by date DESC', [articleId], callback);
  }

  createComment({ articleId, username, text }: comment, callback) {
    var val = [articleId, username, text];
    super.query('insert into comments (articleId, username, text) values (?,?,?)', val, callback);
  }

  deleteComment(id: number, callback) {
    super.query('Delete from comments where articleId = ?', [id], callback);
  }
};
