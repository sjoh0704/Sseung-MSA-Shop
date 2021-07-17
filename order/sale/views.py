
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



# class OrderNonParam(BaseView):
#     @method_decorator(csrf_exempt)
#     def dispatch(self, request, *args, **kargs):
#         return super(OrderNonParam, self).dispatch(request, *args, **kargs)

#     # 주문하기 
#     def post(self, request):
#         try:
#             data = json.loads(request.body)
          
#         except:
#             data = request.POST
#         print(data)
#         seller_id = data.get('seller_id')
#         buyer_id = data.get('buyer_id')
#         product_id = data.get('product_id')
#         quantity = data.get('quantity')
#         email_address = data.get('email_address')
#         address = data.get('address')
#         demand_amount = data.get('demand_amount')
#         print(seller_id, buyer_id, product_id, quantity, email_address, address,demand_amount)
#         if not (buyer_id and product_id and quantity and email_address and address and seller_id and demand_amount):
#             print("여기")
#             return self.response(message="not sufficent info", status=400)

#         data_dict = data.dict()
#         data_dict["quantity"] = int(quantity) - int(demand_amount)
        
#         response = requests.post('{}/apis/v1/product/{}'.format(PRODUCT_SERIVCE_URL, product_id), data_dict)
#         if response.status_code == 200:
        
#             order = Order(
#                         seller_id = seller_id,
#                         buyer_id = buyer_id,
#                         quantity = demand_amount,
#                         product_id = product_id,
#                         email_address = email_address,
#                         address = address
#             )
#             order.save()

#             return self.response(message='delete order success', status=200)
#         return self.response(message='delete order fails', status=400)
        

 


class SalesView(BaseView):
    @method_decorator(csrf_exempt)
    def dispatch(self, request, *args, **kargs):
        return super(SalesView, self).dispatch(request, *args, **kargs)
    
        # 판매자 입장에서 상품 별 주문 정보 얻기 
        # pk = product_id
    def get(self, request, pk):
        print('here')
        try:
                
            orders = Order.objects.filter(product_id=pk)
            product_response = requests.get('{}/apis/v1/product/{}'.format(PRODUCT_SERIVCE_URL, pk))
          
            product = json.loads(product_response.content)["payload"]
            user_response = requests.get('{}/apis/v1/user'.format(USER_SERIVCE_URL))
            user_list = json.loads(user_response.content)["payload"]
  
            order_list = []
        
         
            print(orders)

            for order in orders:
                for user in user_list:
                    if order.buyer_id == user.get('user_id'):
                        print("fff")
                        data = {}
                        data['user_name'] = user.get('username', None)
                        data['user_email'] = user.get('useremail', None)
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
                        # data['updated_at'] = order.updated_at
                        # data['base64_image_url'] = product.get('base64_image_url', None)
                        data['sales_stage'] = product.get("sales_stage", None)
                        order_list.append(data)
                        break
            print(order_list)
        except Exception as e:
            print(e)
            return self.response(message="get order fails Error: "+ str(e), status=400)

        return self.response(data=order_list, message="get order success")

        # 주문 편집
        # pk = order_id
    # def post(self, request, pk):

    #     order = get_object_or_404(Order, pk=pk)
    #     try:
    #         data = json.loads(request.body)
    #     except:
    #         data = request.POST
    #     print(data)
       
    #     email_address = data.get('email_address')
    #     if email_address:
    #         order.email_address = email_address
    #     address = data.get('address')
    #     if address:
    #         order.address = address
    #     order.save()

    #     return self.response(message='edit order success', status=200)


    
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
        


