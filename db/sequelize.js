const Sequelize = require('sequelize');

// Utilisez l'URI de connexion MySQL
const sequelize = new Sequelize('mysql://ugfs4olepte6fizj:eSX1RQOnrXwDjXvg7Aox@brztsbwmlfk2p7xqoyvt-mysql.services.clever-cloud.com:3306/brztsbwmlfk2p7xqoyvt', {
    dialect: 'mysql',
    logging: false, // désactive le logging de Sequelize
    dialectOptions: {
        connectTimeout: 60000 // augmenter le délai d'attente à 60 secondes
    }
});

sequelize.sync({}).then(() => {
    console.log('Database & tables created!');
}).catch((err) => {
    console.error('Unable to connect to the database:', err);
});

module.exports = sequelize;
