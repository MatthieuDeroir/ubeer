const amqp = require('amqplib');
require("dotenv").config();

let channel, connection;

const connect = async () => {
    connection = await amqp.connect(process.env.RABBITMQ_URL || 'amqp://rabbitmq:rabbitmq@rabbitmq-6i94:10000');
    channel = await connection.createChannel();
    await channel.assertQueue('beerQueue', { durable: true });
};

const publishMessage = async (message) => {
    if (!channel) {
        await connect();
    }
    const messageString = JSON.stringify(message);
    channel.sendToQueue('beerQueue', Buffer.from(messageString));
};

async function deleteQueue() {
    const conn = await amqp.connect('amqp://rabbitmq:rabbitmq@rabbitmq-wily.onrender.com:5672');
    const channel = await conn.createChannel();
    const queue = 'beerQueue';
    
    await channel.deleteQueue(queue);
    console.log(`Queue ${queue} deleted`);

    await channel.close();
    await conn.close();
}

module.exports = { publishMessage, deleteQueue };
