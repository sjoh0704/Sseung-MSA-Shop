from django.core import serializers
from django.http import JsonResponse 
import json
from django.shortcuts import get_object_or_404
from django.http.response import Http404, HttpResponse
from django.views import View
from django.utils.decorators import method_decorator
from django.views.decorators.csrf import csrf_exempt

import requests
import os 

ORDER_SERVICE_URL = os.environ.get("ORDER_SERVICE_URL",'http://localhost:8300')

class BaseView(View):
    @staticmethod
    def response(data={}, message ="", status=200):
        results = {
            'payload': data,
            'message':message,
        }

        return JsonResponse(results, status=status)



class OrderNonParam(BaseView):
    @method_decorator(csrf_exempt)
    def dispatch(self, request, *args, **kargs):
        return super(OrderNonParam, self).dispatch(request, *args, **kargs)

    # 주문 생성
    def post(self, request):
     
        try:
            data = json.loads(request.body)
          
        except:
            data = request.POST
        print(data)
        response = requests.post('{}/apis/v1/order'.format(ORDER_SERVICE_URL), data)
        if response.status_code == 200:
            return self.response(message='create order success')
        return self.response(message='create order fails', status=400)
        
 


class OrderView(BaseView):
    @method_decorator(csrf_exempt)
    def dispatch(self, request, *args, **kargs):
        return super(OrderView, self).dispatch(request, *args, **kargs)
    
    
    # 구매 기록 리스트 
    def get(self, request, pk):
        response = requests.get('{}/apis/v1/order/{}'.format(ORDER_SERVICE_URL, pk))
        if response.status_code == 200:
            data = json.loads(response.content)
            print(data)
            return self.response(data = data, message='get order list success')
        return self.response(message='get order list fails', status=400)


    # 주문 변경
    # 수량은 변경은 없음. 
    def post(self, request, pk):
     
        try:
            data = json.loads(request.body)
          
        except:
            data = request.POST
        print(data)
        response = requests.post('{}/apis/v1/order/{}'.format(ORDER_SERVICE_URL, pk), data)
        if response.status_code == 200:
            return self.response(message='edit order success')
        return self.response(message='edit order fails', status=400)


    
    # 주문 취소 
    def delete(self, request, pk):
        response = requests.delete('{}/apis/v1/order/{}'.format(ORDER_SERVICE_URL, pk))
        if response.status_code == 200:
            return self.response(message='delete order success')
        return self.response(message='delete order fails', status=400)

        