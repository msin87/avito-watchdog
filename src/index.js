const server = require('./express/server');
const Parser = require("./avito/parser")();
const urlsDb = require('./express/api/models/urls');
const UrlsGetter = require('./avito/paginationurls');
const Dispatcher = require('./worker/master');
const start = async () => {
    const urls = (await urlsDb.getList({})).docs;
    result = await parser.next();
    result = await parser.next();
    result = await parser.next();
    result = await parser.next();
    result = await parser.next();
    result = await parser.next();
    result = await parser.next();
    result = await parser.next();

    console.log('end');
};
Dispatcher.start(6000).then(() => {
    Dispatcher.workers[0].send({
        type: 'SET_URL',
        payload: {
            url: 'https://www.avito.ru/moskva/audio_i_video/televizory_i_proektory-ASgBAgICAUSIArgJ?cd=1&pmax=3000&q=%D1%82%D0%B5%D0%BB%D0%B5%D0%B2%D0%B8%D0%B7%D0%BE%D1%80',
            category: 'other'
        }
    })
}).catch(() => {

})
server(3001)
    .then(async msg => {
        console.log(msg);
    })
    .catch(err =>
        console.log(err));


// start();