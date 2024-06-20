const breweryService = require('../services/bo/breweryService');

const breweryController = {
    async getAllBreweries(req, res) {
        try {
            const breweries = await breweryService.getAllBreweries();
            res.status(201).json(breweries);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    async createBrewery(req, res) {
        try {
            const brewery = await breweryService.createBrewery(req.body);
            res.status(201).json(brewery);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    },

    async getBreweryById(req, res) {
        try {
            const brewery = await breweryService.getBrewery(req.params.id);
            if (!brewery) {
                return res.status(404).json({ error: "Brewery not found" });
            }
            res.json(brewery);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    async updateBrewery(req, res) {
        try {
            const brewery = await breweryService.updateBrewery(req.params.id, req.body);
            if (!brewery) {
                return res.status(404).json({ error: "Brewery not found" });
            }
            res.json(brewery);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    },

    async deleteBrewery(req, res) {
        try {
            const success = await breweryService.deleteBrewery(req.params.id);
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

module.exports = breweryController;