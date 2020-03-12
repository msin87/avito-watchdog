const Parser = require("../avito/parser")();
const STATE = {
    IDLE: 'IDLE',
    BUSY: 'BUSY',
    STOP: 'STOP'
};
let parser, state = STATE.STOP;
const childProcess = () => {
    console.log(`Worker ${process.pid} started`);
    process.on('message', async message => {
        switch (message.type) {
            case 'SET_URL':
                parser = await Parser(message['payload']['url'], message['payload']['category']);
                process.send({pid: process.pid, type: 'IDLE'});
                break;
            case 'NEXT':
                process.send({pid: process.pid, type: 'BUSY'});
                let result;
                try {
                    result = await parser.next();
                }
                catch (error)
                {
                    console.log(error);
                }
                if (result.done) {
                    process.send({pid: process.pid, type: 'STOP'});
                } else {
                    process.send({pid: process.pid, type: 'RESULT'});
                }
                break;
            default:
                break;
        }
    });
    process.send({type: 'IDLE', pid: process.pid});
    // process.exit();
};
childProcess();