const axios = require('axios');
const cheerio = require('cheerio');
const stringToUnixTime = require('../utils/avitotime');
const getList = async url => {
    let html;
    try {
        html = await axios(url);
    } catch (err) {
        return err;
    }
    const $ = cheerio.load(html.data);
    return {pages: $('.pagination-page').toArray().length,
    items: $('.item_table-wrapper').toArray() };
    return {
        next: () => nextPage < list.pages.length ?
            {value: parser(nextPage++), done: false} :
            {done: true}
    }
};
const listParser = list => {

    return () => {
        return list.items.map((line, index) => {
            const $ = cheerio.load(line);
            return {
                href: 'https://avito.ru' + $('.snippet-link').attr('href'),
                text: $('.snippet-link').text().trim(),
                price: {
                    currency: $('span[itemprop=priceCurrency]').attr('content'),
                    value: Number($('.price').text().replace(/[^\d]/g, ''))
                },
                address: {
                    locality: $('meta[itemprop=addressLocality]').attr('content'),
                    geoReference: $('.item-address-georeferences-item__content').text().trim()
                },
                time: stringToUnixTime($('div[data-absolute-date]').attr('data-absolute-date'))
            }
        })
    };
};
module.exports = {listParser,getList};