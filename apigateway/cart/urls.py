from django.urls import path, include
from .views import CartNonParam, CartByUser, CartParams

urlpatterns = [
    path('<word>', CartParams.as_view()),
    path('', CartNonParam.as_view()),
    path('users/<int:pk>', CartByUser.as_view()),
]