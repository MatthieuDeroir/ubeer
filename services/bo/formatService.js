const Format = require("../../models/sql/formatModel");

const formatService = {
    
        /**
        * @typedef {Object} Format
        * @property {number} id - The ID of the format.
        * @property {string} name - The name of the format.
        * @property {number} volume - The volume of the format.
        * @property {string} unit - The unit of the format.
        */
    
        /**
        * Get all formats from the database.
        * @returns {Promise<Format[]>} An array of all formats.
        */
        getAllFormats: async function() {
            try {
                const formats = await Format.findAll();
                return formats;
            } catch (error) {
                throw new Error(`Unable to get formats: ${error.message}`);
            }
        },
    
        /**
        * Create a new format in the database.
        * @param {Object} formatData - The data of the format to create.
        * @returns {Promise<Format>} The newly created format.
        */
        createFormat: async function(formatData) {
            try {
                const format = await Format.create(formatData);
                return format;
            } catch (error) {
                throw new Error(`Unable to create format: ${error.message}`);
            }
        },
    
        /**
        * Get a format by ID from the database.
        * @param {number} formatId - The ID of the format to retrieve.
        * @returns {Promise<Format>} The format with the specified ID.
        */
        getFormatById: async function(formatId) {
            try {
                const format = await Format.findByPk(formatId);
                if (!format) {
                    throw new Error('Format not found');
                }
                return format;
            } catch (error) {
                throw new Error(`Unable to get format: ${error.message}`);
            }
        },
    
        /**
        * Update a format by ID in the database.
        * @param {number} formatId - The ID of the format to update.
        * @param {Object} formatData - The data of the format to update.
        * @returns {Promise<Format>} The updated format.
        */
        updateFormat: async function(formatId, formatData) {
            try {
                const format = await Format.findByPk(formatId);
                if (!format) {
                    throw new Error('Format not found');
                }
                await format.update(formatData);
                return format;
            } catch (error) {
                throw new Error(`Unable to update format: ${error.message}`);
            }
        },

        deleteFormat: async function(formatId) {
            try {
                const format = await Format.findByPk(formatId);
                if (!format) {
                    throw new Error('Format not found');
                }
                await format.destroy();
                return format;
            } catch (error) {
                throw new Error(`Unable to delete format: ${error.message}`);
            }
        }
};

module.exports = formatService;