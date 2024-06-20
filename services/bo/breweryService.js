const breweryModel = require('../../models/sql/breweryModel');

const breweryService = {
    /**
     * @typedef {Object} Brewery
     * @property {number} id - The ID of the brewery.
     * @property {string} name - The name of the brewery.
     * @property {string} city - The city where the brewery is located.
     * @property {string} state - The state where the brewery is located.
     * @property {string} country - The country where the brewery is located.
     */

    /**
     * Get all breweries from the database.
     * @returns {Promise<Brewery[]>} An array of all breweries.
     */
    getAllBreweries: async function() {
        try {
            const breweries = await breweryModel.findAll();
            return breweries;
        } catch (error) {
            throw new Error(`Unable to get breweries: ${error.message}`);
        }
    },

    /**
     * Create a new brewery in the database.
     * @param {Object} breweryData - The data of the brewery to create.
     * @returns {Promise<Brewery>} The newly created brewery.
     */
    createBrewery: async function(breweryData) {
        try {
            const brewery = await breweryModel.create(breweryData);
            return brewery;
        } catch (error) {
            throw new Error(`Unable to create brewery: ${error.message}`);
        }
    },

    /**
     * Get a brewery by ID from the database.
     * @param {number} breweryId - The ID of the brewery to retrieve.
     * @returns {Promise<Brewery>} The brewery with the specified ID.
     */
    getBrewery: async function(breweryId) {
        try {
            const brewery = await breweryModel.findByPk(breweryId);
            if (!brewery) {
                throw new Error('Brewery not found');
            }
            return brewery;
        } catch (error) {
            throw new Error(`Unable to get brewery: ${error.message}`);
        }
    },

    /**
     * Update a brewery in the database.
     * @param {number} breweryId - The ID of the brewery to update.
     * @param {Object} breweryData - The data to update the brewery with.
     * @returns {Promise<Brewery>} The updated brewery.
     */
    updateBrewery: async function(breweryId, breweryData) {
        try {
            const brewery = await breweryModel.findByPk(breweryId);
            if (!brewery) {
                throw new Error('Brewery not found');
            }
            await brewery.update(breweryData);
            return brewery;
        } catch (error) {
            throw new Error(`Unable to update brewery: ${error.message}`);
        }
    },

    deleteBrewery: async function(breweryId) {
        try {
            const brewery = await breweryModel.findByPk(breweryId);
            if (!brewery) {
                throw new Error('Brewery not found');
            }
            await brewery.destroy();
            return true;
        } catch (error) {
            throw new Error(`Unable to delete brewery: ${error.message}`);
        }
    }

};

module.exports = breweryService;