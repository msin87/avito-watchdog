const Categories = require('./category');
const Parser = require("../avito/parser")();
let parser;
const childProcess = () => {
    console.log(`Worker ${process.pid} started and finished`);
    process.on('message', async message => {
        switch (message.type) {
            case 'SET_URL':
                parser = await Parser.init(message['payload']['url'], message['payload']['category']);
                break;
            case 'NEXT':
                break;
            default:
                break;
        }
    })
    process.send('test');
    // process.exit();
};
childProcess();