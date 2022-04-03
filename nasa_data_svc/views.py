from turtle import down
from urllib import response
from django.shortcuts import render
import django
from rest_framework.views import APIView
from nasa_data_svc.nasautils import Utilities
# Create your views here.


class Data(APIView):

    def post(self, request):

        data = request.data
        u = Utilities()
        final_results = u.download(data["startDate"], data["endDate"])
        gifs = u.plot(final_results)
        response = django.http.JsonResponse({"success": True, "data": gifs}, status=200)
        return response
