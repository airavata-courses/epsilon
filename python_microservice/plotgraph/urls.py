from django.urls import path, include
from . import views

urlpatterns = [
    path('statuscheck/', views.statusCheck.as_view())
]
