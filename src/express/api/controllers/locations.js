const model = require('../models/locations');

module.exports = {
    searchRuLocation: async (req, res) => {
        const result = await model.searchRuLocation(req.query['q'],req.query['limit']);
        res.send(result);
    }
};