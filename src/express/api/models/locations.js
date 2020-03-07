const avitoLocationsApi = require('../../../avito/api/locations');
module.exports = {
    searchRuLocation: async (query, limit) =>
        await avitoLocationsApi.searchRuLocation({query,limit})
};