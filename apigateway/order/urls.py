from django.urls import path
from .views import OrderView, OrderNonParam

urlpatterns = [

    path('<int:pk>', OrderView.as_view()),
    path('', OrderNonParam.as_view())
]