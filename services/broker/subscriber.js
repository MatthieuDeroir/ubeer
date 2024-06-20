const amqp = require('amqplib');
require("dotenv").config();
const { handleCommand } = require('./commandHandlers');

async function startWorker() {
    try {
        console.log("Connecting to RabbitMQ...");
        const conn = await amqp.connect('amqp://localhost');
        console.log("Connection successful, creating channel...");
        const channel = await conn.createChannel();
        console.log("Channel created, asserting queue...");
        const queue = "beerQueue";
        await channel.assertQueue(queue, { durable: true });
        console.log("Queue asserted, worker is waiting for commands");
    
        channel.consume(queue, async function(msg) {
            if (msg !== null) {
                console.log(`Message received: ${msg.content.toString()}`);
                const command = msg.content.toString();
                await handleCommand(command);
                channel.ack(msg);
                console.log("Message processed and acknowledged");
            }
        });
    } catch (error) {
        console.error("Failed to start worker: ", error.message);
        console.log("Stack Trace:", error.stack);
        if (error.code) {
            console.log("Error Code:", error.code);
        }
    }
    
}

module.exports = { startWorker };
