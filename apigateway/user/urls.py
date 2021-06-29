from django.urls import path, include
from .views import  UserLoginView, UserLogoutView, UserAPIView, UserAPIViewParam
urlpatterns = [
    path('', UserAPIView.as_view(), name='api_v1_user_create'),
    path('<int:pk>', UserAPIViewParam.as_view(), name='api_v1_user_api'),
    path('login', UserLoginView.as_view(), name='api_v1_user_login'),
    path('logout', UserLogoutView.as_view(), name='api_v1_user_logout')
]