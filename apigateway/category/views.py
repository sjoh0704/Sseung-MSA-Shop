from django.core import serializers
from django.http import JsonResponse 
import json
from django.shortcuts import get_object_or_404
from django.http.response import Http404, HttpResponse
from django.views import View
from django.utils.decorators import method_decorator
from django.views.decorators.csrf import csrf_exempt
from rest_framework.renderers import JSONRenderer
import requests
from django.conf import settings
import os 
PRODUCT_SERVICE_URL = os.environ.get("PRODUCT_SERVICE_URL",'http://localhost:8100')

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
   
   
    def get(self, request):
        response = requests.get('{}/apis/v1/category'.format(PRODUCT_SERVICE_URL))
        if response.status_code == 200:
            data = json.loads(response.content)

            return self.response(data = data, message='get category success')
        return self.response(message='get category fails', status=400)

class GetProductByCategory(BaseView):
    
    @method_decorator(csrf_exempt)
    def dispatch(self, request, *args, **kargs):
        return super(GetProductByCategory, self).dispatch(request, *args, **kargs)
    
    def get(self, request, pk):
        response = requests.get('{}/apis/v1/category/{}'.format(PRODUCT_SERVICE_URL, pk))
        if response.status_code == 200:
            data = json.loads(response.content)

            return self.response(data = data, message='get product by category success')
        return self.response(message='get product by category fails', status=400)

