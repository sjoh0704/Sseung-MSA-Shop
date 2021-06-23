from django.urls import path
from .views import UserCreateView, UserLoginView, UserLogoutView
urlpatterns = [
    path('v1/users/create', UserCreateView.as_view(), name='api_v1_user_create'),
    path('v1/users/login', UserLoginView.as_view(), name='api_v1_user_login'),
    path('v1/users/logout', UserLogoutView.as_view(), name='api_v1_user_logout'),
    
]