const Dao = require('./Dao');

module.exports = class CommentDao extends Dao {

    getComments(articleId, callback) {
        super.query("Select * from comments where articleId = ? order by date DESC", [articleId], callback);
    }

    createComment({articleId, username, text}, callback) {
        var val = [articleId, username, text];
        super.query(
            "insert into comments (articleId, username, text) values (?,?,?)",
            val,
            callback
        );
    }
};
