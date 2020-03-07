const server = require('./express/server');
const baseUrl = 'https://www.avito.ru/reutov/kvartiry/sdam?cd=1&f=550_5702-5703-5704';
const Parser = require("./avito/parser")(baseUrl);
// const Filter = require('./avito/filter')({text:{$regex: }});
const Categories = require('./avito/category');

server(3001)
    .then(msg =>
        console.log(msg))
    .catch(err =>
        console.log(err));

const start = async () => {

    const parser = await Parser.init(Categories['kvartiry']);
    let result = await parser.next();
    result.value.items = result.value.items.filter(Filter);
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

// start();