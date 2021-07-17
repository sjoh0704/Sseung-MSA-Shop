from django.urls import path
from .views import OrderView, OrderNonParam, SaleView

urlpatterns = [

    path('<int:pk>', OrderView.as_view()),
    path('', OrderNonParam.as_view()),
    path('sale/<int:pk>', SaleView.as_view()),
]