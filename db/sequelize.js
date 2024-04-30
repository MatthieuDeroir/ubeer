// sqlite3 conneciton to the database ./db.sqlite
const Sequelize = require('sequelize');

const sequelize = new Sequelize(
    {
        dialect: 'sqlite',
        storage: './db.sqlite'
    }
);  

sequelize.sync({ force: true }).then(() => {
    console.log('Database & tables created!');
}

);

module.exports = sequelize;


