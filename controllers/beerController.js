// sequelize controller for writing, updating, and deleting beers
// mongoose controller for reading beers

const beerService = require('../services/beerService');

const beerController = {
    async createBeer(req, res) {
        try {
            const beer = await beerService.createBeer(req.body);
            res.status(201).json(beer);
        } catch (error) {
            res.status(400).json({ error: error.message });
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
