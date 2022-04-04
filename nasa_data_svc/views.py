from turtle import down
from urllib import response
from django.shortcuts import render
import django
from rest_framework.views import APIView
from nasa_data_svc.nasautils import Utilities
import os
from dotenv import load_dotenv
import redis
from dotenv import load_dotenv
import traceback

# Create your views here.


class Data(APIView):

    def post(self, request):
        config = load_dotenv(".env")
        r = redis.Redis(host=os.getenv("REDIS_HOST"),
                        port=os.getenv("REDIS_PORT"), db=0)

        try:
            print("REQUEST")
            print(request)
            data = request.data
            u = Utilities()
            final_results = u.download(data["startDate"], data["endDate"])
            gifs = u.plot(final_results)
            response = django.http.JsonResponse(
                {"success": True, "data": gifs}, status=200)

            filepath = 'files/gifs/' + gifs[0]
            redisValue = {'Status': 'Image Created Successfully',
                          'FilePath': filepath}

            r.set(str(data['UID']), str(redisValue))

            return response

        except Exception as e:
            print("REQUEST")
            print(request)
            redisValue = {'Status': 'Error in Image Creation', 'FilePath': ''}
            r.set(str(data['UID']), str(redisValue))

            traceback.print_exc()
            res = django.http.JsonResponse(
                {"success": False, "message": "Server is down", "Exception": e}, status=500)
            return res
