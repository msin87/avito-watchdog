const cp = require('child_process');
const numCores = require('os').cpus().length;
const workers = [];
const masterProcess = {
    start: () => new Promise((resolve, reject) => {

        console.log('Master cluster setting up ' + numCores + ' workers');
        for (let i = 0; i < numCores; i++) {
            workers.push(cp.fork(__dirname + '/worker.js'));
            workers[i].on('message', function (message) {
                console.log(message);
            });
        }
        resolve(true);
    }),
    workers
};

module.exports = masterProcess;