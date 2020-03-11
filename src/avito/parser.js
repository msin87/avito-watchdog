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
module.exports = () => {
    let pagesUrls, $, nextPage = 0;
    const getItems = $ => $('.item[itemtype="http://schema.org/Product"]').toArray();
    const init = async (url,category) => {
        $ = await cheerioInit(url);
        pagesUrls = $('.pagination-page').toArray().map(page => 'https://avito.ru' + page.attribs.href);
        return {
            next: async () => {
                const state = !nextPage ? QueryState.BEGIN : nextPage < pagesUrls.length ? QueryState.NEXT : QueryState.END;
                const result = {
                    value: {
                        items: Object.create(null),
                        totalItems: $('span[class*=page-title-count]').text()
                    }, done: false
                };
                switch (state) {
                    case "BEGIN":
                        result.value.items = itemsParser(getItems($), category);
                        break;
                    case "NEXT":
                        result.value.items = itemsParser(getItems(await cheerioInit(pagesUrls[nextPage])),category);
                        break;
                    case "END":
                        result.done = true;
                        break;
                }
                nextPage += 1;
                return result;
            }
        }
    };
    return {init};
};