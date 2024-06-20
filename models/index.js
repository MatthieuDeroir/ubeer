const SQLModels = require('./sql/');
const MongoModels = require('./mongo/');

module.exports = Models = {
    SQL: SQLModels,
    Mongo: MongoModels
}