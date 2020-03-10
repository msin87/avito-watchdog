const express = require('express');
const bodyParser = require('body-parser');
const router = require('./api/routes/index');
const es = express();
es.use(bodyParser.json());
es.use(bodyParser.urlencoded(({extended: true})));
es.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});
es.use(router);

module.exports = port => new Promise(((resolve, reject) => {
    try {
        es.listen(3001, () => {
            resolve(`Express started at ${port}! Folder: ${__dirname}`);
        });
    } catch (err) {
        reject(err);
    }

}));


