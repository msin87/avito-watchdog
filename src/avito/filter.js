const sift = require("sift");
const filter = snippetQuery => {
    let query = Object.create(null);
    if (snippetQuery) {
        query['text']['$regex'] = snippetQuery['text']['$regex'] ? query['text']['$regex'] : /.*/;
        if (snippetQuery['text']['$not']) {
            query['text']['$not'] = snippetQuery['text']['$not'];
        }
        if ((snippetQuery['price'] && snippetQuery['price']['value']['$lte']) < (snippetQuery['price'] && snippetQuery['price']['value']['$gte'])) {
            query['price']['value']['$lte'] = snippetQuery['price']['value']['$lte'];
            query['price']['value']['$gte'] = snippetQuery['price']['value']['$gte'];
        }
    }
    return sift(query);
};
module.exports = filter;