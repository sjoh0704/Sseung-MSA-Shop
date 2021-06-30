from django.urls import path
from .views import GetCategory,GetProductByCategory
urlpatterns = [
    path('', GetCategory.as_view()),
    path('/<int:pk>', GetProductByCategory.as_view()),

]