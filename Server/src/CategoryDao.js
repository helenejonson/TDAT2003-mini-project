// @flow
const Dao = require('./Dao');

module.exports = class CategoryDao extends Dao {
    getCategories(callback) {
        super.query("Select * from category", [], callback);
    }
};