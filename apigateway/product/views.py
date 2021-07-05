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



class ProductNonParam(BaseView):
    @method_decorator(csrf_exempt)
    def dispatch(self, request, *args, **kargs):
        return super(ProductNonParam, self).dispatch(request, *args, **kargs)

    
    def post(self, request):
     
        try:
            data = json.loads(request.body)
          
        except:
            data = request.POST
        print(data)
        response = requests.post('{}/apis/v1/product'.format(PRODUCT_SERVICE_URL), data)
        if response.status_code == 200:
            return self.response(message='create product success')
        return self.response(message='create product fails', status=400)
        



    def get(self, request):
        
        response = requests.get('{}/apis/v1/product'.format(PRODUCT_SERVICE_URL))
        if response.status_code == 200:
            data = json.loads(response.content)
            print(data)
            return self.response(data = data, message='get product success')
        return self.response(message='get product fails', status=400)
 


class ProductStatusView(BaseView):
    @method_decorator(csrf_exempt)
    def dispatch(self, request, *args, **kargs):
        return super(ProductStatusView, self).dispatch(request, *args, **kargs)
    
    
    def get(self, request, pk):
        response = requests.get('{}/apis/v1/product/{}'.format(PRODUCT_SERVICE_URL, pk))
        if response.status_code == 200:
            data = json.loads(response.content)
            print(data)
            return self.response(data = data, message='get product success')
        return self.response(message='get product fails', status=400)


        
    def post(self, request, pk):
     
        try:
            data = json.loads(request.body)
          
        except:
            data = request.POST
        print(data)
        response = requests.post('{}/apis/v1/product/{}'.format(PRODUCT_SERVICE_URL, pk), data)
        if response.status_code == 200:
            return self.response(message='edit product success')
        return self.response(message='edit product fails', status=400)


    
    
    def delete(self, request, pk):
        response = requests.delete('{}/apis/v1/product/{}'.format(PRODUCT_SERVICE_URL, pk))
        if response.status_code == 200:
            return self.response(message='delete product success')
        return self.response(message='delete product fails', status=400)

        
