import redis
from multiprocessing import Process
from kafka import KafkaConsumer
import os
from dotenv import load_dotenv
import json
from nasa_data_svc.views import Data
from django.test.client import RequestFactory
from rest_framework.request import Request
from rest_framework.parsers import JSONParser


config = load_dotenv(".env")

r = redis.Redis(host=os.getenv("REDIS_HOST"), port=os.getenv("REDIS_PORT"), db=0)


def consumeData():
    consumer = KafkaConsumer('getnasaimage', bootstrap_servers=[os.getenv("KAFKA")], api_version=(0, 10))

    for message in consumer:
        try:
            reqJson = json.loads(message.value)
            redisValue = '{ "Status": "Working on Image Creation", "FilePath": "" }'
            r.set(reqJson['UID'], redisValue)
            print(reqJson)
            request = Request(RequestFactory().post('/irrelevant', content_type='application/json', data=reqJson), parsers=[JSONParser()])

            data = Data()
            data.post(request)

        except Exception as e:
            print(e)


if __name__ == 'main':
    t1 = Process(target=consumeData)
    t1.start()
