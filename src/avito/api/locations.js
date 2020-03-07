const axios = require('axios');
const db = require('../../db/db')('Locations');
const AVITO_MODULE_REGEX = /"9Gwr":function\(e,t,o\)\{"use strict";t\.a=\{.*\}\},"9R94"/gi;
const LOCATIONS_URL = 'https://www.avito.st/mstatic/build/13.f9cf57d3aff7f.js';
const SEARCH_LOCATION_API_URL = 'https://www.avito.ru/web/1/slocations';
const storeLocations = async url => {
    let script;
    try {
        script = (await axios.get(url)).data;
    } catch (err) {
        console.log(err);
    }
    const locationsString = script.match(AVITO_MODULE_REGEX)[0].split('t.a=');
    const locations = locationsString[1].split('}}')[0].slice(1).split(',')
        .map((val) =>
            ({name: val.split(':')[0], id: val.split(':')[1]}));
    await db['Locations'].deleteAsync({}, {multi: true});
    await db['Locations'].insertAsync(locations);
};
const getEnLocationById = async id => await db['Locations'].findOneAsync({id: id.toString()});
const searchRuLocation = async ({query, limit, url = SEARCH_LOCATION_API_URL}) =>
    (await axios.get(url, {params: {q: query, limit}})).data;

storeLocations(LOCATIONS_URL);

module.exports = {getEnLocationById, searchRuLocation};