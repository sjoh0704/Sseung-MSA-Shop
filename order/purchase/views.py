
from django.http import JsonResponse 
from django.core import serializers
import json
from django.shortcuts import get_object_or_404
from django.http.response import Http404, HttpResponse
from django.views import View
from django.utils.decorators import method_decorator
from django.views.decorators.csrf import csrf_exempt
from rest_framework.renderers import JSONRenderer
import requests
from django.conf import settings
from .models import Order
import os
PRODUCT_SERIVCE_URL = os.environ.get('PRODUCT_SERVICE_URL', 'http://localhost:8100')

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

    # 주문하기 
    def post(self, request):
        try:
            data = json.loads(request.body)
          
        except:
            data = request.POST
        print(data)
        buyer_id = data.get('buyer_id')
        product_id = data.get('product_id')
        quantity = data.get('quantity')
        email_address = data.get('email_address')
        address = data.get('address')

        if not (buyer_id and product_id and quantity and email_address and address):
            return self.response(message="not sufficent info", status=400)
        order = Order(
                    buyer_id = buyer_id,
                    quantity = quantity,
                    product_id = product_id,
                    email_address = email_address,
                    address = address
        )
        order.save()

        return self.response(message='create order success', status=200)
        


    # 모든 주문 정보 얻기 
    # def get(self, request):
        
    #     response = requests.get('{}/apis/v1/product'.format(PRODUCT_SERIVCE_URL))
    #     if response.status_code == 200:
    #         data = json.loads(response.content)
    #         print(data)
    #         return self.response(data = data, message='get product success')
    #     return self.response(message='get product fails', status=400)
 


class OrderView(BaseView):
    @method_decorator(csrf_exempt)
    def dispatch(self, request, *args, **kargs):
        return super(OrderView, self).dispatch(request, *args, **kargs)
    
        # 주문 정보 얻기 
        # pk = buyer_id
    def get(self, request, pk):
        
        orders = Order.objects.filter(buyer_id=pk)
        json_orders = serializers.serialize('json', orders)
        print(json_orders)
        return HttpResponse(json_orders, content_type="text/json-comment-filtered")


        # 주문 편집
    def post(self, request, buyer_id):
        try:
            data = json.loads(request.body)
          
        except:
            data = request.POST
        print(data)
        product_id = data.get('product_id')
        quantity = data.get('quantity')
        email_address = data.get('email_address')
        address = data.get('address')
        if not (buyer_id and product_id and quantity and email_address and address):
            return self.response(message="not sufficent info", status=400)
        order = Order(
                    buyer_id = buyer_id,
                    quantity = quantity,
                    product_id = product_id,
                    email_address = email_address,
                    address = address
        )
        order.save()

        return self.response(message='create order success', status=200)


    
    
    def delete(self, request, pk):
        response = requests.delete('{}/apis/v1/product/{}'.format(PRODUCT_SERIVCE_URL, pk))
        if response.status_code == 200:
            return self.response(message='delete product success')
        return self.response(message='delete product fails', status=400)

        
