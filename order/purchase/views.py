
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
PRODUCT_SERVICE_URL = os.environ.get('PRODUCT_SERVICE_URL', 'http://localhost:8100')
# USER_SERVICE_URL = os.environ.get('USER_SERVICE_URL', 'http://localhost:8200')

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
        headers = {}
        for key, value in request.headers.items():
            if key.startswith('X-'):
                headers[key] = value
        self.headers=headers
        return super(OrderNonParam, self).dispatch(request, *args, **kargs)

    # 주문하기 
    def post(self, request):
        try:
            data = json.loads(request.body)
          
        except:
            data = request.POST

        seller_id = data.get('seller_id')
        buyer_id = data.get('buyer_id')
        product_id = data.get('product_id')
        quantity = data.get('quantity')
        email_address = data.get('email_address')
        address = data.get('address')
        demand_amount = data.get('demand_amount')
        if not (buyer_id and product_id and quantity and email_address and address and seller_id and demand_amount):
            return self.response(message="not sufficent info", status=400)

        

        # data_dict = data.dict()
        # data_dict["quantity"] = int(quantity) - int(demand_amount)
        if int(quantity) - int(demand_amount) < 0:
            return self.response(message='초과 주문 불과', status=400)
        # response = requests.post('{}/apis/v1/product/{}'.format(PRODUCT_SERVICE_URL, product_id), data_dict)
        # if response.status_code == 200:
        try:
            order = Order(
                    seller_id = seller_id,
                    buyer_id = buyer_id,
                    quantity = demand_amount,
                    product_id = product_id,
                    email_address = email_address,
                    address = address
            )
            order.save()
            return self.response(message='create order success', status=200)
     
        
        except Exception as e:
            print(e)
            return self.response(message='create order fails', status=400)

        

 


class OrderView(BaseView):
    @method_decorator(csrf_exempt)
    def dispatch(self, request, *args, **kargs):
        headers = {}
        for key, value in request.headers.items():
            if key.startswith('X-'):
                headers[key] = value
        self.headers=headers
        return super(OrderView, self).dispatch(request, *args, **kargs)
    
        # 주문 정보 얻기 
        # pk = buyer_id
    def get(self, request, pk):
        
        try:
                
            orders = Order.objects.filter(buyer_id=pk)
            response = requests.get('{}/apis/v1/product'.format(PRODUCT_SERVICE_URL), headers=self.headers)
            products = json.loads(response.content)["payload"]
            order_by_user = []
            for order in orders:
                for product in products:
                    if order.product_id == product.get('pk'):
                        data = {}
                        data['order_id'] = order.pk
                        data['product_id'] = product.get('pk', None)
                        data['seller_id'] = product.get('seller_id', None)
                        data['category_id'] = product.get('category', None)    
                        data['name'] = product.get('name', None)
                        data['description'] = product.get('description', None)
                        data['total_quantity'] = product.get('quantity', None)
                        data['demand_quantity'] = order.quantity
                        data["buyer_id"] = order.buyer_id
                        data["email_address"] = order.email_address
                        data["address"] = order.address
                        data['price'] = product.get('price', None)
                        data['created_at'] = order.created_at
                        data['base64_image_url'] = product.get('base64_image_url', None)
                        data['sales_stage'] = order.sales_stage
                        data['rating_check'] = order.rating_check
                        order_by_user.append(data)
                        break
          
        except Exception as e:
            return self.response(message="get order fails Error: "+e, status=400)

        return self.response(data=order_by_user, message="get order success")

        # 주문 편집
        # pk = order_id
    def post(self, request, pk):
        order = get_object_or_404(Order, pk=pk)
        try:
            data = json.loads(request.body)
        except:
            data = request.POST
        
        sales_stage = data.get('sales_stage')

        if sales_stage:
            order.sales_stage = sales_stage 

        # 주문 완료 처리 
        if sales_stage == 'SO':
            try:
                product_id = data.get('product_id')
                demand_quantity = data.get('demand_quantity')
                total_quantity = data.get('total_quantity')
                tmp = {
                    "quantity":  int(total_quantity) - int(demand_quantity)
                }
                response = requests.post('{}/apis/v1/product/{}'.format(PRODUCT_SERVICE_URL, product_id), tmp, headers=self.headers)
                if response.status_code == 200:
                    order.save()
                    return self.response(message='판매완료')
                return self.response(message='error', status=400)

            except Exception as e:
                print(e)
                return self.response(message='fail', status=400)

        email_address = data.get('email_address')
        if email_address:
            order.email_address = email_address
        address = data.get('address')
        if address:
            order.address = address
        rating_check = data.get('rating_check')
        if rating_check:
            order.rating_check = rating_check

        order.save()

        return self.response(message='edit order success', status=200)


    
        # 주문 취소 
        # pk = order_id
    def delete(self, request, pk):
        try:
            order = get_object_or_404(Order, pk=pk)
            order.delete()
    
            return self.response(message='delete order success', status=200)
        except Exception as e:
            print(e)
            return self.response(message='delete order fails', status=400)
            
        



# 상품에 따른 주문 
class OrderByProduct(BaseView):
    @method_decorator(csrf_exempt)
    def dispatch(self, request, *args, **kargs):
        headers = {}
        for key, value in request.headers.items():
            if key.startswith('X-'):
                headers[key] = value
        self.headers=headers
        return super(OrderByProduct, self).dispatch(request, *args, **kargs)
    

        # pk = product_id
    def delete(self, request, pk):
        
        try:    
            orders = Order.objects.filter(product_id=pk)
            orders.delete()
            return self.response(message="order by product delete success")


        except Exception as e:
            print(e)
            return self.response(message="order by product delete success", status=400)
