// sequelize controller for writing, updating, and deleting beers
// mongoose controller for reading beers

const beerService = require('../services/bo/beerService');
const { publishMessage } = require('../services/broker/publisher');

const beerController = {
    async getAllBeers(req, res) {
        try {
            const beers = await beerService.getAllBeers();
            console.log(beers)
            res.status(201).json(beers);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    async createBeer(req, res) {
        try {
        
            const beer = await beerService.createBeer(req.body);
            
            publishMessage(beer.toJSON());
            res.status(201).json(beer);
        } catch (error) {
            console.log(req.body)
            console.log(error)
            res.status(400).json({ error: error.message });
        }
    },

    async getBeerById(req, res) {
        try {
            const beer = await beerService.getBeerById(req.params.id);
            if (!beer) {
                return res.status(404).json({ error: "Beer not found" });
            }
            res.json(beer);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    async updateBeer(req, res) {
        try {
            const beer = await beerService.updateBeer(req.params.id, req.body);
            if (!beer) {
                return res.status(404).json({ error: "Beer not found" });
            }
            res.json(beer);
        } catch (error) {
            console.log(req.body)

            res.status(400).json({ error: error.message });
        }
    },

    async deleteBeer(req, res) {
        try {
            const success = await beerService.deleteBeer(req.params.id);
            if (success) {
                res.status(204).send();
            } else {
                res.status(404).send();
            }
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
};

module.exports = beerController;
