from django.urls import path, include
from .views import CartNonParam
# from .views import  UserLoginView, UserLogoutView, UserAPIView, UserAPIViewParam
urlpatterns = [
    # path('<int:pk>', UserAPIViewParam.as_view(), name='api_v1_user_api'),
    path('', CartNonParam.as_view()),
    # path('login', UserLoginView.as_view(), name='api_v1_user_login'),
    # path('logout', UserLogoutView.as_view(), name='api_v1_user_logout')
]