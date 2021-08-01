from django.urls import path, include
from .views import CartNonParam, CartCheck, CartByUser, CartParams

urlpatterns = [
    path('<int:pk>', CartParams.as_view()),
    path('', CartNonParam.as_view()),
    path('check', CartCheck.as_view()),
    path('users/<int:pk>', CartByUser.as_view()),
]