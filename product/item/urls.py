from django.urls import path
from .views import ProductNonParam, ProductStatusView, GetCategory,GetProductByCategory, DeleteProductCascadingUser
urlpatterns = [

    path('product/', ProductNonParam.as_view()),
    path('product/<int:pk>', ProductStatusView.as_view()),
    path('category/', GetCategory.as_view()),
    path('category/<int:pk>', GetProductByCategory.as_view()),
    
    path('user/<int:pk>/product/', DeleteProductCascadingUser.as_view()),
    

    # path('login', UserLoginView.as_view(), name='api_v1_user_login'),
    # path('logout', UserLogoutView.as_view(), name='api_v1_user_logout'),
    
    
    
]