import redis
from multiprocessing import Process
from unicodedata import name
from kafka import KafkaConsumer
import os
from dotenv import load_dotenv
import json

config = load_dotenv(".env")

print("ENV")
print(os.getenv("REDIS_HOST"))
print(os.getenv("KAFKA"))

r = redis.Redis(host=os.getenv("REDIS_HOST"),
                port=os.getenv("REDIS_PORT"), db=0)


def consumeData():
    consumer = KafkaConsumer('statuscheckpython', bootstrap_servers=[
                             os.getenv("KAFKA")], api_version=(0, 10))

    for message in consumer:
        reqJson = json.loads(message.value)
        redisValue = '{ "Status": "Working on Image Creation", "FilePath": "" }'
        r.set(reqJson['UID'], redisValue)
        print(reqJson)


if __name__ == 'main':
    t1 = Process(target=consumeData)
    t1.start()
