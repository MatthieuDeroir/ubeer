const express = require("express");
const cors = require("cors");
const session = require('express-session');
const passport = require('./config/passport');
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./swagger');
const routes = require("./routes/");
const userRoutes = require('./routes/userRoutes'); // Import userRoutes
const { publishMessage } = require('./services/broker/publisher');
const { startWorker } = require('./services/broker/subscriber');
const { connectMongo } = require("./db/mongoDBConnect");
require("dotenv").config();

const app = express();

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use(cors());
app.use(express.json());
app.use(session({ secret: 'your_secret_key', resave: false, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());

app.use('/api/beer/', routes.beerRoutes);
app.use('/api/brewery/', routes.breweryRoutes);
app.use('/api/format/', routes.formatRoutes);
app.use('/api/user/', routes.userRoutes); // 


const startServer = async () => {
    try {
        await connectMongo();
        startWorker().catch(console.error);
        app.listen(4000, () => {
            console.log("Server is running on port 4000");
        });
    } catch (error) {
        console.error("Failed to start server:", error);
    }
};

startServer();

app.get("/", (req, res) => {
    res.send("Hello World");
});

// // New route to send messages to RabbitMQ
// app.post("/send", async (req, res) => {
//     const { message } = req.body;
//     try {
//         await publishMessage(message);
//         res.status(200).send("Message sent successfully");
//     } catch (error) {
//         res.status(500).send("Failed to send message");
//     }
// });

// OAuth2 routes
app.get('/auth/oauth2', passport.authenticate('oauth2'));

app.get('/auth/oauth2/callback',
    passport.authenticate('oauth2', { failureRedirect: '/' }),
    (req, res) => {
        // Successful authentication
        res.redirect('/');
    }
);
