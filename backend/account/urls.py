from django.urls import path
from .views import  UserLoginView, UserLogoutView, UserAPIView
urlpatterns = [
    path('', UserAPIView.as_view(), name='api_v1_user_create'),
    path('<int:pk>', UserAPIView.as_view(), name='api_v1_user_api'),
    path('login', UserLoginView.as_view(), name='api_v1_user_login'),
    path('logout', UserLogoutView.as_view(), name='api_v1_user_logout'),
    
    
    
]