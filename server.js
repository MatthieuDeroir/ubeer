const express = require("express");
const cors = require("cors");
const { publishMessage } = require('./services/broker/publisher');

const { run } = require("./db/mongoDBConnect");
require("dotenv").config();

run().catch(console.dir);

const app = express();


app.use(cors());

app.use(express.json());

app.listen(4000, () => {
    console.log("Server is running on port 4000");
    });

app.get("/", (req, res) => {
    res.send("Hello World");
}
);


// New route to send messages to RabbitMQ
app.post("/send", async (req, res) => {
    const { message } = req.body;
    try {
        await publishMessage(message);
        res.status(200).send("Message sent successfully");
    } catch (error) {
        res.status(500).send("Failed to send message");
    }
});
