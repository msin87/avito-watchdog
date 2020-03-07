const db = require('../../../db/db')('urls');
module.exports =
    {
        getList: async ({sort = ['id', 1], range = [], filter = {}}) => {
            if (sort[0] === 'id') sort[0] = '_id';
            let docs = await db['urls'].findAsync({
                filter,
                sort: {[sort[0]]: sort[1] === 'ASC' ? 1 : -1},
                skip: range[0],
                limit: (range[1])
            });
            let total = await db['urls'].countAsync();
            return {docs, total};
        },
        getOne: async query => {
            if (query.hasOwnProperty('id'))
                return await db['urls'].findOneAsync({id: query.id});
            return await db['urls'].findOneAsync(query)
        },
        create: async query => await db['urls'].insertAsync(query),
        update: async query => await db['urls'].updateAsync({id: query['id']}, query),
        delete: async query => await db['urls'].deleteAsync({id: query['id']}, {})
    };