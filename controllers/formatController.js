const formatService = require('../services/bo/formatService');

const formatController = {  
    async getAllFormats(req, res) {
        try {
            const formats = await formatService.getAllFormats();
            res.status(201).json(formats);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    async createFormat(req, res) {
        try {
            const format = await formatService.createFormat(req.body);
            res.status(201).json(format);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    },

    async getFormatById(req, res) {
        try {
            const format = await formatService.getFormat(req.params.id);
            if (!format) {
                return res.status(404).json({ error: "Format not found" });
            }
            res.json(format);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    async updateFormat(req, res) {
        try {
            const format = await formatService.updateFormat(req.params.id, req.body);
            if (!format) {
                return res.status(404).json({ error: "Format not found" });
            }
            res.json(format);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    },

    async deleteFormat(req, res) {
        try {
            const success = await formatService.deleteFormat(req.params.id);
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

module.exports = formatController;