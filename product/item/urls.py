from django.urls import path
from .views import ProductNonParam, ProductStatusView
urlpatterns = [

    path('<int:pk>', ProductStatusView.as_view(), name='api_v1_product_status'),
    path('', ProductNonParam.as_view(), name='api_v1_product'),

    # path('login', UserLoginView.as_view(), name='api_v1_user_login'),
    # path('logout', UserLogoutView.as_view(), name='api_v1_user_logout'),
    
    
    
]