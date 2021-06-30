from django.urls import path
from .views import ProductNonParam, ProductStatusView, DeleteProductCascadingUser
urlpatterns = [

    path('', ProductNonParam.as_view()),
    path('/<int:pk>', ProductStatusView.as_view()),
    path('/user/<int:pk>', DeleteProductCascadingUser.as_view()),
    
    
]