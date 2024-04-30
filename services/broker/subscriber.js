const amqp = require('amqplib');
const { set } = require('mongoose');

async function startConsumer() {
    const conn = await amqp.connect('amqp://localhost');
    const channel = await conn.createChannel();
    const queue = 'hello';

    await channel.assertQueue(queue, { durable: false });
    console.log("Waiting for messages in %s. To exit press CTRL+C", queue);

    channel.consume(queue, function(msg) {
            if (msg !== null) {
                console.log("Received:", msg.content.toString());
                channel.ack(msg);
            }
        
    });
}

startConsumer().catch(console.error);
