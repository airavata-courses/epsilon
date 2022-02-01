from django.urls import path, include
from . import views

urlpatterns = [
    path('statuscheck/', views.statusCheck.as_view()),
    # path('fetchplot/', views.fetchPlot.as_view()),
    path('fetchplot/', views.fetchPlot2.as_view())


]
