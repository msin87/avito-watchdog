const axios = require('axios');
const db = require('../../db/db')('Locations');
const mapObj = require('map-obj')
const regex = /"9Gwr":function\(e,t,o\)\{"use strict";t\.a=\{.*\}\},"9R94"/gi;
const LocationsURL = 'https://www.avito.st/mstatic/build/13.f9cf57d3aff7f.js';
const locationIdFilter = (locations, id) => locations.filter(location => +location['id'] === +id);
const getLocations = async url => {
    let script, locationsXML, locationsRU;
    try {
        script = (await axios.get(url)).data;
    } catch (err) {
        console.log(err);
    }
    const locationsString = script.match(regex)[0].split('t.a=');
    const locations = locationsString[1].split('}}')[0].slice(1).split(',')
        .map((val) =>
            ({name: val.split(':')[0], id: val.split(':')[1]}));
    const filtered = locationIdFilter(locations, '626370');
    ss;
};
getLocations(LocationsURL);