const avitoParser = require('./avito/parser');
const baseUrl = 'https://www.avito.ru/moskva?q=xiaomi+mi+9t';
const start = async () => {
    let list = await avitoParser.getList(baseUrl);
    let res = await avitoParser.listParser(list).next();

}

start();