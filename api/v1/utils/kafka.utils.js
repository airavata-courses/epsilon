const { Kafka } = require('kafkajs');

const kafka = new Kafka({
    clientId: 'API-GTW',
    brokers: ['localhost:9092']
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
