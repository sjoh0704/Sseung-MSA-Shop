from django.urls import path
from .views import ProductNonParam, ProductStatusView
urlpatterns = [

    path('', ProductNonParam.as_view()),
    path('<int:pk>', ProductStatusView.as_view()),
    
]