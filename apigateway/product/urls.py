from django.urls import path
from .views import ProductNonParam, ProductStatusView, ProductByUser
urlpatterns = [

    path('', ProductNonParam.as_view()),
    path('<int:pk>', ProductStatusView.as_view()),
    path('user/<int:pk>', ProductByUser.as_view()),
    
]