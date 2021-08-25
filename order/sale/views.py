
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
from purchase.models import Order
import os
PRODUCT_SERIVCE_URL = os.environ.get('PRODUCT_SERVICE_URL', 'http://localhost:8100')
USER_SERIVCE_URL = os.environ.get('USER_SERVICE_URL', 'http://localhost:8200')
class BaseView(View):
    @staticmethod
    def response(data={}, message ="", status=200):
        results = {
            'payload': data,
            'message':message,
        }

        return JsonResponse(results, status=status)


class SalesView(BaseView):
    @method_decorator(csrf_exempt)
    def dispatch(self, request, *args, **kargs):
        headers = {}
        for key, value in request.headers.items():
            if key.startswith('X-'):
                headers[key] = value
        self.headers=headers
        return super(SalesView, self).dispatch(request, *args, **kargs)
    
        # 판매자 입장에서 상품 별 주문 정보 얻기 
        # pk = product_id
    def get(self, request, pk):
        try:
            orders = Order.objects.filter(product_id=pk)
            product_response = requests.get('{}/apis/v1/product/{}'.format(PRODUCT_SERIVCE_URL, pk), headers=self.headers)
          
            product = json.loads(product_response.content)["payload"]
            user_response = requests.get('{}/apis/v1/user'.format(USER_SERIVCE_URL), headers=self.headers)
            user_list = json.loads(user_response.content)["payload"]
            order_list = []
            for order in orders:
                for user in user_list:
          
                    if order.buyer_id == user.get('user_id'):
                        data = {}
            
                        data['order_id'] = order.id
                        data['user_name'] = user.get('username', None)
                        data['user_email'] = user.get('useremail', None)
                        data['phone_number'] = user.get('phone_number', None)
                        data['category_id'] = product.get('category', None)
                        data['product_name'] = product.get('name', None)
                        data['description'] = product.get('description', None)
                        data['total_quantity'] = product.get('quantity', None)
                        data['demand_quantity'] = order.quantity
                        data["buyer_id"] = order.buyer_id
                        data["email_address"] = order.email_address
                        data["address"] = order.address
                        data['price'] = product.get('price', None)
                        data['created_at'] = order.created_at
                        data['sales_stage'] = order.sales_stage
                        
                        # data['updated_at'] = order.updated_at
             
                        order_list.append(data)
                        break
        except Exception as e:
            return self.response(message="get order fails Error: "+ str(e), status=400)
        return self.response(data=order_list, message="get order success")

  


    
    #     # 주문 취소 
    #     # pk = order_id
    # def delete(self, request, pk):
    #     order = get_object_or_404(Order, pk=pk)
    #     product_id = order.product_id
    #     quantity = order.quantity
    #     get_response = requests.get('{}/apis/v1/product/{}'.format(PRODUCT_SERIVCE_URL, product_id))
    #     dic_response = json.loads(get_response.content)['payload']
    #     dic_response["quantity"] += int(quantity)
    #     post_response = requests.post('{}/apis/v1/product/{}'.format(PRODUCT_SERIVCE_URL, product_id), dic_response)

    #     if post_response.status_code == 200:
    #         order.delete()

    #         return self.response(message='create order success', status=200)
    #     return self.response(message='create order fails', status=400)
        


