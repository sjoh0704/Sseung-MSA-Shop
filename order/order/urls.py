"""order URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/3.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path
from purchase.views import OrderView, OrderNonParam, OrderByProduct
from sale.views import SalesView
from django.http.response import HttpResponse

def healthCheck(request):
    return HttpResponse("good")

urlpatterns = [
    path('health/', healthCheck),
    path('admin/order/', admin.site.urls),
    path('apis/v1/order/<int:pk>', OrderView.as_view()),
    path('apis/v1/order', OrderNonParam.as_view()),
    path('apis/v1/order/sale/<int:pk>', SalesView.as_view()),
    path('apis/v1/product/<int:pk>/order', OrderByProduct.as_view())
    
]
