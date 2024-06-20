const { SQL: { Beer, Brewery, Format } } = require('../../models');
const { Mongo } = require('../../models');
const { publishMessage } = require('../broker/publisher');

const beerService = {

    getAllBeers: async function() {
        try {
            const beers = await Mongo.Beer.find();
            return beers;
        } catch (error) {
            throw new Error(`Unable to get beers: ${error.message}`);
        }
    },

    createBeer: async function(beerData) {
        // try {
            const newBeer = await Beer.create(beerData);
            console.log(newBeer);
            const brewery = await Brewery.findByPk(newBeer.breweryId);
            const format = await Format.findByPk(newBeer.formatId);

            const message = {
                action: 'createBeer',
                data: {
                    id: newBeer.id,
                    name: newBeer.name,
                    style: newBeer.style,
                    type: newBeer.type,
                    abv: newBeer.abv,
                    ibu: newBeer.ibu,
                    price: newBeer.price,
                    description: newBeer.description,
                    imageUrl: newBeer.imageUrl,
                    brewery: {
                        name: brewery.name,
                        city: brewery.city,
                        address: brewery.address
                    },
                    format: {
                        name: format.name,
                        volume: format.volume,
                        unit: format.unit
                    },
                    createdAt: newBeer.createdAt,
                    updatedAt: newBeer.updatedAt
                }
            };
            await publishMessage(message);
            return newBeer;
        // } catch (error) {
        //     throw new Error(`Unable to create beer: ${error.message}`);
        // }
    },

    getBeerById: async function(beerId) {
        try {
            const beer = await Beer.findByPk(beerId);
            if (!beer) {
                throw new Error('Beer not found');
            }
            return beer;
        } catch (error) {
            throw new Error(`Unable to get beer: ${error.message}`);
        }
    },

    updateBeer: async function(beerId, beerData) {
        try {
            const beer = await Beer.findByPk(beerId);
            if (!beer) {
                throw new Error('Beer not found');
            }
            const updatedBeer = await beer.update(beerData);
            const brewery = await Brewery.findByPk(updatedBeer.breweryId);
            const format = await Format.findByPk(updatedBeer.formatId);

            const message = {
                action: 'updateBeer',
                data: {
                    id: updatedBeer.id,
                    name: updatedBeer.name,
                    style: updatedBeer.style,
                    type: updatedBeer.type,
                    abv: updatedBeer.abv,
                    ibu: updatedBeer.ibu,
                    description: updatedBeer.description,
                    imageUrl: updatedBeer.imageUrl,
                    brewery: {
                        name: brewery.name,
                        city: brewery.city,
                        address: brewery.address
                    },
                    format: {
                        name: format.name,
                        volume: format.volume,
                        unit: format.unit
                    },
                    createdAt: updatedBeer.createdAt,
                    updatedAt: updatedBeer.updatedAt
                }
            };
            await publishMessage(message);
            return updatedBeer;
        } catch (error) {
            throw new Error(`Unable to update beer: ${error.message}`);
        }
    },

    deleteBeer: async function(beerId) {
        try {
            const beer = await Beer.findByPk(beerId);
            if (!beer) {
                throw new Error('Beer not found');
            }
            await beer.destroy();
            const message = {
                action: 'deleteBeer',
                data: {
                    id: beer.id
                }
            };
            await publishMessage(message);
            return true;
        } catch (error) {
            throw new Error(`Unable to delete beer: ${error.message}`);
        }
    }
};

module.exports = beerService;
