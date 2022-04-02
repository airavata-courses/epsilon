const { Kafka } = require('kafkajs');
const KAFKA = process.env.KAFKA;

const kafka = new Kafka({
    clientId: 'API-GTW',
    brokers: [KAFKA]
})

const producer = kafka.producer();

exports.run = async (topicName, msg) => {
    // Producing
    console.log(topicName)
    await producer.connect()
    await producer.send({
        topic: topicName,
        messages: [{
            value: msg
        }],
    })
}
