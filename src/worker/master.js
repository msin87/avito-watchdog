"use strict"
const cp = require('child_process');
const numCores = require('os').cpus().length;
const workers = [];
const Parser = require("../avito/parser")();
const URL = 'https://www.avito.ru/moskva/audio_i_video/televizory_i_proektory-ASgBAgICAUSIArgJ?cd=1&pmax=3000&q=%D1%82%D0%B5%D0%BB%D0%B5%D0%B2%D0%B8%D0%B7%D0%BE%D1%80';

let timer, workerIndex = 0;

const masterProcess = {
    start: (interval) => new Promise(async (resolve, reject) => {

        console.log('Master cluster setting up ' + numCores + ' workers');
        for (let i = 0; i < numCores; i++) {
            workers.push(cp.fork(__dirname + '/worker.js'));
            workers[i]['state'] = 'IDLE';
            workers[i].on('message', message => {
                switch (message.type) {
                    case 'STOP':
                        console.log(`Worker №${i}: STOP`);
                        workers[i]['state'] = 'STOP';
                        break;
                    case 'IDLE':
                        console.log(`Worker №${i}: IDLE`);
                        workers[i]['state'] = 'IDLE';
                        break;
                    case 'BUSY':
                        console.log(`Worker №${i}: BUSY`);
                        workers[i]['state'] = 'BUSY';
                        break;
                    case 'RESULT':
                        console.log(`Worker №${i}: RESULT`);
                        workers[i]['state'] = 'IDLE';
                        break;
                }
            });
        }
        timer = setInterval(() => {
            if (workers[workerIndex]['state'] === 'IDLE')
                workers[workerIndex].send({type: 'NEXT', id: workerIndex});
            workerIndex++;
            if (workerIndex >= numCores) workerIndex = 0
        }, interval);
        resolve(true);
    }),
    workers
};

module.exports = masterProcess;