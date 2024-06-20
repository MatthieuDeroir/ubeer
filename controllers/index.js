const beerController = require('./beerController');
const breweryController = require('./breweryController');
const formatController = require('./formatController');

module.exports = Controller = {
    Beer : beerController,
    Brewery : breweryController,
    Format : formatController
}
