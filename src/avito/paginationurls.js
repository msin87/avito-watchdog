const axios = require('axios');
const cheerio = require('cheerio');
const numCores = require('os').cpus().length;
const cheerioInit = async (url) => {
    try {
        const html = (await axios(url)).data;
        return cheerio.load(html);
    } catch (err) {
        return err;
    }
};
module.exports = () => {
    let pagesUrls;
    return {
        splitPages(){
            const leftUrls = pagesUrls.length % numCores;
            const cores = Array(numCores);
            for (let i = 0; i<numCores; i++) {
                cores[i]=[];
            }
            for (let urlNumber = 0; urlNumber < pagesUrls.length-leftUrls; urlNumber++) {
                cores[urlNumber%numCores].push(pagesUrls[urlNumber]);
            }
            for (let urlNumber = pagesUrls.length-leftUrls; urlNumber< pagesUrls.length; urlNumber++){
                cores[urlNumber%numCores].push(pagesUrls[urlNumber]);
            }
            return cores;
        },
        async setUrl(url){
            const $ = await cheerioInit(url);
            pagesUrls = $('.pagination-page').toArray().map(page => 'https://avito.ru' + page.attribs.href);
            return this;
        }}
};