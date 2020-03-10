// const Factory = require('../../../factory/react-admin/controller');
// const decorator = require('./decorators/index');
const glob = require('glob');
const path = require('path');
const categories = Object.create(null);
glob.sync(path.join(__dirname, '**/*.js'),{ignore: path.join(__dirname,'index.js')}).forEach(file =>
    Object.assign(categories, {[path.basename(file, '.js')]: require(file)}));
module.exports = categories;