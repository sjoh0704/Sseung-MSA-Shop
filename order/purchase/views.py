
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
        seller_id = data.get('seller_id')
        buyer_id = data.get('buyer_id')
        product_id = data.get('product_id')
        quantity = data.get('quantity')
        email_address = data.get('email_address')
        address = data.get('address')

        if not (buyer_id and product_id and quantity and email_address and address and seller_id):
            return self.response(message="not sufficent info", status=400)


        get_response = requests.get('{}/apis/v1/product/{}'.format(PRODUCT_SERIVCE_URL, product_id))
        dic_response = json.loads(get_response.content)['payload']
        dic_response["quantity"] -= int(quantity)
        post_response = requests.post('{}/apis/v1/product/{}'.format(PRODUCT_SERIVCE_URL, product_id), dic_response)

        if post_response.status_code == 200:
        
            order = Order(
                        seller_id = seller_id,
                        buyer_id = buyer_id,
                        quantity = quantity,
                        product_id = product_id,
                        email_address = email_address,
                        address = address
            )
            order.save()

            return self.response(message='delete order success', status=200)
        return self.response(message='delete order fails', status=400)
        

 


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
        # pk = order_id
    def post(self, request, pk):

        order = get_object_or_404(Order, pk=pk)
        try:
            data = json.loads(request.body)
        except:
            data = request.POST
        print(data)
       
        email_address = data.get('email_address')
        if email_address:
            order.email_address = email_address
        address = data.get('address')
        if address:
            order.address = address
        order.save()

        return self.response(message='edit order success', status=200)


    
        # 주문 취소 
        # pk = order_id
    def delete(self, request, pk):
        order = get_object_or_404(Order, pk=pk)
        product_id = order.product_id
        quantity = order.quantity
        get_response = requests.get('{}/apis/v1/product/{}'.format(PRODUCT_SERIVCE_URL, product_id))
        dic_response = json.loads(get_response.content)['payload']
        dic_response["quantity"] += int(quantity)
        post_response = requests.post('{}/apis/v1/product/{}'.format(PRODUCT_SERIVCE_URL, product_id), dic_response)

        if post_response.status_code == 200:
            order.delete()

            return self.response(message='create order success', status=200)
        return self.response(message='create order fails', status=400)
        
