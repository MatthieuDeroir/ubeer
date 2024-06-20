const { User } = require('../models/sql/userModel');

const ensureAdmin = async (req, res, next) => {
    try {
        const user = await User.findOne({ where: { oauthId: req.user.sub } });
        if (user.role !== 'admin') {
            return res.status(403).json({ message: 'Access forbidden: Admins only' });
        }
        next();
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { ensureAdmin };
