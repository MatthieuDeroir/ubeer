const amqp = require('amqplib');
require("dotenv").config();
const { handleCommand } = require('./commandHandlers');
const { connectMongo } = require('../../db/mongoDBConnect');

async function startWorker() {
    try {
        await connectMongo(); // Ensure MongoDB is connected
        const conn = await amqp.connect(process.env.RABBITMQ_URL || 'amqp://localhost');
        const channel = await conn.createChannel();
        const queue = "beerQueue";

        await channel.assertQueue(queue, { durable: true });
        console.log("Worker is waiting for commands");

        channel.consume(queue, async function(msg) {
            if (msg !== null) {
                const command = msg.content.toString();
                await handleCommand(command);
                channel.ack(msg);
            }
        });
    } catch (error) {
        console.error("Failed to start worker:", error);
    }
}

module.exports = { startWorker };
