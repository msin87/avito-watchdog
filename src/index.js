const baseUrl = 'https://www.avito.ru/reutov/kvartiry/sdam?cd=1&f=550_5702-5703-5704';
const Parser = require("./avito/parser")(baseUrl);
const Locations = require('./avito/library/locations');
// const Filter = require('./avito/filter')({text:{$regex: }});
const Categories =  require('./avito/category');
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