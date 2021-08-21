from django.urls import path
from .views import RatingUpView, RatingDownView

urlpatterns = [
    path('<int:pk>/up', RatingUpView.as_view()),
    path('<int:pk>/down', RatingDownView.as_view()),
    
]