from django.core import serializers
from django.http import JsonResponse 
import json
from django.shortcuts import get_object_or_404
from django.http.response import Http404, HttpResponse
from django.views import View
from django.utils.decorators import method_decorator
from django.views.decorators.csrf import csrf_exempt
from rest_framework.renderers import JSONRenderer



class BaseView(View):
    @staticmethod
    def response(data={}, message ="", status=200):
        results = {
            'payload': data,
            'message':message,
        }

        return JsonResponse(results, status=status)




    
class GetCategory(BaseView):


    @method_decorator(csrf_exempt)
    def dispatch(self, request, *args, **kargs):
        return super(GetCategory, self).dispatch(request, *args, **kargs)
   
   
    # def get(self, request):
    #     categories = Category.objects.all()
    #     json_list = serializers.serialize('json', categories)
    #     return HttpResponse(json_list, content_type="text/json-comment-filtered")


class GetProductByCategory(BaseView):
    
    
    @method_decorator(csrf_exempt)
    def dispatch(self, request, *args, **kargs):
        return super(GetProductByCategory, self).dispatch(request, *args, **kargs)
    
    
    # def get(self, request, pk):
    #     category = Category.objects.get(id=pk)
    #     products = Product.objects.filter(category=category)
    #     # products = category.product_set.all()

       
    #     json_list = serializers.serialize('json', products)
    #     return HttpResponse(json_list, content_type="text/json-comment-filtered")
