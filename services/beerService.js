// Import the Beer model
const Beer = require('../models/Beer');

const beerService = {
    /**
     * Create a new beer in the database.
     * @param {Object} beerData - The data of the beer to create.
     * @returns {Promise<Beer>} The newly created beer.
     */
    createBeer: async function(beerData) {
        try {
            const beer = await Beer.create(beerData);
            return beer;
        } catch (error) {
            throw new Error(`Unable to create beer: ${error.message}`);
        }
    },

    /**
     * Update an existing beer in the database.
     * @param {number} beerId - The ID of the beer to update.
     * @param {Object} beerData - The new data for the beer.
     * @returns {Promise<Beer>} The updated beer.
     */
    updateBeer: async function(beerId, beerData) {
        try {
            const beer = await Beer.findByPk(beerId);
            if (!beer) {
                throw new Error('Beer not found');
            }
            const updatedBeer = await beer.update(beerData);
            return updatedBeer;
        } catch (error) {
            throw new Error(`Unable to update beer: ${error.message}`);
        }
    },

    /**
     * Delete a beer from the database.
     * @param {number} beerId - The ID of the beer to delete.
     * @returns {Promise<boolean>} True if the beer was deleted.
     */
    deleteBeer: async function(beerId) {
        try {
            const beer = await Beer.findByPk(beerId);
            if (!beer) {
                throw new Error('Beer not found');
            }
            await beer.destroy();
            return true;
        } catch (error) {
            throw new Error(`Unable to delete beer: ${error.message}`);
        }
    }
};

module.exports = beerService;
