const axios = require('axios');
const cheerio = require('cheerio');
const stringToUnixTime = require('../utils/avitotime');
const QueryState = {BEGIN: 'BEGIN', NEXT: 'NEXT', END: 'END'};
const Categories = require('../avito/category');
const cheerioInit = async (url) => {
    try {

        const html = (await axios(url)).data;
        return cheerio.load(html);
    } catch (err) {
        return err;
    }
};
const itemsParser = (list, category) => {
    return list.map((line, index) => {
        const $ = cheerio.load(line);
        const snippet = $('.snippet-link');
        const result = {
            href: 'https://avito.ru' + snippet.attr('href'),
            text: snippet.text().trim(),
            price: {
                currency: $('span[itemprop=priceCurrency]').attr('content'),
                value: Number($('.price').text().replace(/[^\d]/g, ''))
            },
            address: {
                locality: $('meta[itemprop=addressLocality]').attr('content'),
                addressString: $('.item-address__string').text().trim(),
                geoReference: $('.item-address-georeferences-item__content').text().trim()
            },
            time: stringToUnixTime($('div[data-absolute-date]').attr('data-absolute-date')||$('div[data-marker=item-date]').text().trim())
        };
        const customFields = Categories[category](result);
        return Object.assign(result,customFields);
    })
};
module.exports = async (url, category) => {
    const getItems = $ => $('.item[itemtype="http://schema.org/Product"]').toArray();
    const $ = await cheerioInit(url);
    return itemsParser(getItems($), category);
};