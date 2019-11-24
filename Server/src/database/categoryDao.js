// @flow
const Dao = require('./dao');

module.exports = class CategoryDao extends Dao {
  getCategories(callback) {
    super.query('Select * from category', [], callback);
  }
};
