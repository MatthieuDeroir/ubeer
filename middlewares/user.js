// Middleware pour vérifier si l'utilisateur existe
const ensureUserExists = async (req, res, next) => {
    try {
        const oauthId = req.user.sub;
        let user = await User.findOne({ where: { oauthId } });

        if (!user) {
            const name = req.user.name || req.user.nickname || 'Default Name';
            const email = req.user.email || 'default@example.com';
            user = await User.create({
                username: name,
                email: email,
                oauthId: oauthId,
                address: 'default address'
            });
        }

        req.userRecord = user;
        next();
    } catch (error) {
        res.status(500).send("Failed to ensure user exists");
    }
};

module.exports = { ensureUserExists };