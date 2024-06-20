const passport = require('passport');
const OAuth2Strategy = require('passport-oauth2');
require('dotenv').config();

// Configure the OAuth2 strategy
passport.use(new OAuth2Strategy({
    authorizationURL: process.env.OAUTH2_AUTHORIZATION_URL,
    tokenURL: process.env.OAUTH2_TOKEN_URL,
    clientID: process.env.OAUTH2_CLIENT_ID,
    clientSecret: process.env.OAUTH2_CLIENT_SECRET,
    callbackURL: process.env.OAUTH2_CALLBACK_URL
},
function(accessToken, refreshToken, profile, cb) {
    // Here you would typically fetch the user from the database
    // and return the user instance
    const user = { accessToken, profile }; // Example user object
    return cb(null, user);
}));

passport.serializeUser((user, done) => {
    done(null, user);
});

passport.deserializeUser((obj, done) => {
    done(null, obj);
});

module.exports = passport;
