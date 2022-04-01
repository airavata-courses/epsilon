from multiprocessing import Process
from unicodedata import name
from kafka import KafkaConsumer


def consumeData():
    consumer = KafkaConsumer('statuscheckpython', bootstrap_servers=['localhost:9092'], api_version=(0, 10))

    for message in consumer:
        print(message.value)


if __name__ == 'main':
    t1 = Process(target=consumeData)
    t1.start()
