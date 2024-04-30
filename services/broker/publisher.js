const amqp = require('amqplib');

async function publishMessage(msg) {
    const conn = await amqp.connect('amqp://localhost');
    const channel = await conn.createChannel();
    const queue = 'hello';

    await channel.assertQueue(queue, { durable: false });
    channel.sendToQueue(queue, Buffer.from(msg));

    console.log("Sent:", msg);
    await channel.close();
    await conn.close();
}

module.exports = { publishMessage };
