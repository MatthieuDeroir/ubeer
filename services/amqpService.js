const amqp = require('amqplib');

async function connectAMQP() {
  try {
    const connection = await amqp.connect('amqp://localhost');
    const channel = await connection.createChannel();
    await channel.assertQueue('task_queue');
    return channel;
  } catch (error) {
    console.error('Error connecting to AMQP broker:', error);
  }
}

module.exports = { connectAMQP };
