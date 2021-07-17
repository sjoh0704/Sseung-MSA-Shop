from django.urls import path
from .views import ProductNonParam, ProductStatusView, GetCategory,GetProductByCategory, ProductByUser
urlpatterns = [

    path('product', ProductNonParam.as_view()),
    path('product/<int:pk>', ProductStatusView.as_view()),
    path('category', GetCategory.as_view()),
    path('category/<int:pk>', GetProductByCategory.as_view()),
    
    path('product/user/<int:pk>', ProductByUser.as_view()),
    
    
]