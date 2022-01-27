from django.http import HttpResponse
from rest_framework.views import APIView
from rest_framework.response import Response


# Create your views here.
class statusCheck(APIView):

    def get(self, request):
        try:
            res = {"success": True, "message": "Server is Up and Running"}
            return Response(res)

        except Exception as e:
            res = {"success": False, "message": "Server is down", "Exception": e}
            return Response(res)
