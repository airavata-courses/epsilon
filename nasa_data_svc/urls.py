from django.urls import path,include
from nasa_data_svc import views

urlpatterns=[
    path('download/',views.Data.as_view())
]