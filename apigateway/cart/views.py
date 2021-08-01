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
CART_SERVICE_URL = os.environ.get("CART_SERVICE_URL",'http://localhost:8080')

class BaseView(View):
    @staticmethod
    def response(data={}, message ="", status=200):
        results = {
            'payload': data,
            'message':message,
        }

        return JsonResponse(results, status=status)



class CartNonParam(BaseView):
    @method_decorator(csrf_exempt)
    def dispatch(self, request, *args, **kargs):
        return super(CartNonParam, self).dispatch(request, *args, **kargs)

    # cart 생성
    def post(self, request):
        try:
            data = json.loads(request.body)
          
        except:
            data = request.POST
 
        response = requests.post('{}/apis/v1/carts'.format(CART_SERVICE_URL), data)
        if response.status_code == 200:
            return self.response(message='success')
        return self.response(message='fails', status=400)
        


    # get all carts
    def get(self, request):
  
        response = requests.get('{}/apis/v1/carts'.format(CART_SERVICE_URL))

        if response.status_code == 200:
            data = json.loads(response.content)
       
            return self.response(data = data, message='success')
        return self.response(message='fails', status=400)
 


class CartStatusView(BaseView):
    @method_decorator(csrf_exempt)
    def dispatch(self, request, *args, **kargs):
        return super(CartStatusView, self).dispatch(request, *args, **kargs)
    
    
    def get(self, request, pk):
        response = requests.get('{}/apis/v1/CART/{}'.format(CART_SERVICE_URL, pk))
        if response.status_code == 200:
            data = json.loads(response.content)
   
            return self.response(data = data, message='get CART success')
        return self.response(message='get CART fails', status=400)


        
    def post(self, request, pk):
     
        try:
            data = json.loads(request.body)
          
        except:
            data = request.POST

        response = requests.post('{}/apis/v1/CART/{}'.format(CART_SERVICE_URL, pk), data)
        if response.status_code == 200:
            return self.response(message='edit CART success')
        return self.response(message='edit CART fails', status=400)


    
    
    def delete(self, request, pk):
        response = requests.delete('{}/apis/v1/CART/{}'.format(CART_SERVICE_URL, pk))
        if response.status_code == 200:
            return self.response(message='delete CART success')
        return self.response(message='delete CART fails', status=400)

    
class CartByUser(BaseView):
    
    
    @method_decorator(csrf_exempt)
    def dispatch(self, request, *args, **kargs):
        return super(CartByUser, self).dispatch(request, *args, **kargs)
    
    def get(self, request, pk):
      
                
        response = requests.get('{}/apis/v1/CART/user/{}'.format(CART_SERVICE_URL, pk))
        
        if response.status_code == 200:
            data = json.loads(response.content)
   
            return self.response(data = data, message='get Cart by user success')
        return self.response(message='get Cart by user fails', status=400)

 

        
