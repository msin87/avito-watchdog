const Categories = require('../avito/category');
const Parser = require("../avito/parser")();
const middleware = require('./middleware')();
const STATE = {
    IDLE: 'IDLE',
    BUSY: 'BUSY',
    STOP: 'STOP'
};
let parser, state=STATE.STOP, func;
const childProcess = () => {
    console.log(`Worker ${process.pid} started and finished`);
    process.on('message', async message => {
        switch (message.type) {
            case 'SET_FUNC':
                func=middleware.getFunc();
                break;
            case 'SET_URL':
                state = STATE.IDLE;
                parser = await Parser.init(message['payload']['url'], message['payload']['category']);
                break;
            case 'NEXT':
                state = STATE.BUSY;
                const result = await parser.next();
                state = STATE.IDLE;
                process.send({type: 'RESULT', result, pid: process.pid});
                break;
            case 'GET_STATE':
                return state;
            default:
                break;
        }
    });
    process.send('test');
    // process.exit();
};
childProcess();