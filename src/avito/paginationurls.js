const axios = require('axios');
const cheerio = require('cheerio');
const cheerioInit = async (url) => {
    try {
        const html = (await axios(url)).data;
        return cheerio.load(html);
    } catch (err) {
        return err;
    }
};
module.exports = async url => {
    const $ = await cheerioInit(url);
    const pagesUrls = $('.pagination-page').toArray().map(page => 'https://avito.ru' + page.attribs.href);
    const splitPages = parts => {

    }
}