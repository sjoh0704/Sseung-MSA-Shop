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



class ProductNonParam(BaseView):
    @method_decorator(csrf_exempt)
    def dispatch(self, request, *args, **kargs):
        return super(ProductNonParam, self).dispatch(request, *args, **kargs)


    # def post(self, request):
    #     print(request.body)
     
    #     try:
    #         data = json.loads(request.body)
          
    #     except:
    #         data = request.POST
            
    #     print(data)
    #     try:
    #         print("try")
    #         print(data)
    #         seller_id = data.get('seller_id', '')
    #         if not seller_id:
    #             return self.response(message="seller_id 없음", status=400)

    #         category_id = data.get('category_id', '')
    #         category = get_object_or_404(Category, id=category_id)
    #         if not category:
    #             return self.response(message="없는 카테고리", status=400)
        
    #         name = data.get('name', '')
    #         if not name:
    #             return self.response(message="name 없음", status=400)

    #         price = data.get('price', '')
    #         if not price:
    #             return self.response(message="price 없음", status=400)

    #         quantity = data.get('quantity', '')
    #         if not quantity:
    #             return self.response(message="quantity 없음", status=400)
                
    #         description = data.get('description', '')
    #         if not description:
    #             return self.response(message="description 없음", status=400)
            
    #         product = Product.objects.create(name = name,
    #                                         seller_id=seller_id,
    #                                         category=category,
    #                                         price=price,
    #                                         quantity=quantity,
    #                                         description=description)
    #     except Exception as e:
    #         return self.response(message=e, status=400)
    #     else:
    #         return self.response(message="create product success", status=200)



    # def get(self, request):
  
    #     products = Product.objects.all()
    #     json_products = serializers.serialize('json', products)
    #     print(json_products)
    #     return HttpResponse(json_products, content_type="text/json-comment-filtered")
        
    
        
 


class ProductStatusView(BaseView):
    @method_decorator(csrf_exempt)
    def dispatch(self, request, *args, **kargs):
        return super(ProductStatusView, self).dispatch(request, *args, **kargs)

    # def get(self, request, pk):
    #     product = get_object_or_404(Product, id=pk)
    #     data = {
    #         "category": product.category.kind,
    #         "name": product.name,
    #         "price": product.price,
    #         "quantity": product.quantity,
    #         "description": product.description,
    #         "created_at": product.created_at,
    #         "updated_at": product.updated_at
    #     }
    #     return self.response(data=data, message="product data", status=200)


    # def post(self, request, pk):
    
    #     try:
    #         data = json.loads(request.body)
    #     except:
    #         data = request.POST
    #     try:
           
    #         product = get_object_or_404(Product, id=pk)
    #         category_id = data.get('category_id', 0)
    #         category = get_object_or_404(Category, id=category_id)
    #         if category:
    #             product.category=category
    #         name = data.get('name', '')
    #         if name:
    #             product.name = name
    #         price = data.get('price', '')
    #         if price:
    #             product.price = price
    #         quantity = data.get('quantity', '')
    #         if quantity:
    #             product.quantity = quantity         
    #         description = data.get('description', '')
    #         if description:
    #             product.description = description 
    #         product.save()  
    #     except Exception as e:
    #         return self.response(message=e, status=400)
    #     else: 
    #         return self.response(message="change product status", status=200)
    
    
    # def delete(self, request, pk):
    #     product = get_object_or_404(Product, id=pk)
    #     product.delete()
    #     return self.response(message='deleting product success', status=200)

class DeleteProductCascadingUser(BaseView):
    
    
    @method_decorator(csrf_exempt)
    def dispatch(self, request, *args, **kargs):
        return super(DeleteProductCascadingUser, self).dispatch(request, *args, **kargs)
    
    
    # def delete(self, request, pk):
    #     products = Product.objects.filter(seller_id=pk)
    #     # products = category.product_set.all()
    #     print(products)
    #     products.delete()
    #     return self.response(message="deleting product created by user_id={} successes".format(pk), status=200)
        
