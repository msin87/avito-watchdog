const cp = require('child_process');
const numCores = require('os').cpus().length;
const workers = [];
const Parser = require("../avito/parser")();
const middleware = require('./middleware')();
const URL = 'https://www.avito.ru/moskva/audio_i_video/televizory_i_proektory-ASgBAgICAUSIArgJ?cd=1&pmax=3000&q=%D1%82%D0%B5%D0%BB%D0%B5%D0%B2%D0%B8%D0%B7%D0%BE%D1%80';
const Categories = require('../avito/category');
const masterProcess = {
    start: () => new Promise(async (resolve, reject) => {

        console.log('Master cluster setting up ' + numCores + ' workers');
        for (let i = 0; i < numCores; i++) {
            workers.push(cp.fork(__dirname + '/worker.js'));
            workers[i].on('message', function (message) {
                console.log(message);
            });
        }
        middleware.setFunc(await Parser.init(URL, Categories['other']));
        workers[0].send({type: 'SET_FUNC'})
        resolve(true);
    }),
    workers
};

module.exports = masterProcess;