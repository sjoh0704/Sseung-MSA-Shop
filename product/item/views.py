from django.core import serializers
from django.http import JsonResponse 
import json
from django.shortcuts import get_object_or_404
from django.http.response import Http404, HttpResponse
from django.views import View
from django.utils.decorators import method_decorator
from django.views.decorators.csrf import csrf_exempt
from .models import Category, Product, ProductImage
import requests
import os
ORDER_SERVICE_URL = os.environ.get('ORDER_SERVICE_URL', 'http://localhost:8300')
CART_SERVICE_URL = os.environ.get('CART_SERVICE_URL', 'http://172.30.1.34:8080')

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

    # product 생성하기 
    def post(self, request):

        try:
            data = json.loads(request.body)     
        except:
            data = request.POST
        try:
  
            seller_id = data.get('seller_id', '')
            if not seller_id:
                return self.response(message="seller_id 없음", status=400)

            category_id = data.get('category_id', '')
            category = get_object_or_404(Category, id=category_id)
            if not category:
                return self.response(message="없는 카테고리", status=400)
        
            name = data.get('name', '')
            if not name:
                return self.response(message="name 없음", status=400)

            price = data.get('price', '')
            if not price:
                return self.response(message="price 없음", status=400)

            quantity = data.get('quantity', '')
            if not quantity:
                return self.response(message="quantity 없음", status=400)
                
            description = data.get('description', '')
            if not description:
                return self.response(message="description 없음", status=400)
            area = data.get('area', '')
            if not area:
                return self.response(message="area 없음", status=400)
            

            product = Product(name = name,
                            seller_id=seller_id,
                            category=category,
                            price=price,
                            quantity=quantity,
                            description=description,
                            area=area)
            i = 0
            image_list = []
            while True:
                try:
                    base64 = data['{}'.format(i)]
                    productImage = ProductImage(product = product, base64_image_url=base64)
                    image_list.append(productImage)
                    i += 1
                except Exception as e:
              
                
                    break
            if i == 0:
                return self.response(message="uploading image fail", status=400)

            
        except Exception as e:
         
            return self.response(message=e, status=400)
        
        product.save()
        for img in image_list:
            img.save()
        
        return self.response(message="create product success", status=200)


    # 상품 가져오기 
    def get(self, request):
     
        try:
                
            products = Product.objects.all()
            product_list = [{}for _ in range(len(products))]
            for i, product in enumerate(products):
                product_list[i]['pk'] = product.id
                product_list[i]['seller_id'] = product.seller_id
                product_list[i]['category'] = product.category.id
                product_list[i]['name'] = product.name
                product_list[i]['description'] = product.description
                product_list[i]['quantity'] = product.quantity
                product_list[i]['price'] = product.price
                product_list[i]['created_at'] = product.created_at
                product_list[i]['updated_at'] = product.updated_at
                product_list[i]['valid'] = product.valid
                product_list[i]['area'] = product.area
     
                if product.productimage_set.first():
                    product_list[i]['base64_image_url'] = product.productimage_set.first().base64_image_url
                else:
                    product_list[i]['base64_image_url'] = None

        except Exception as e:
      
            return self.response(status=400)
        return self.response(data = product_list, message=200)

        
    
        
 


class ProductStatusView(BaseView):
    @method_decorator(csrf_exempt)
    def dispatch(self, request, *args, **kargs):
        headers = {}
        for key, value in request.headers.items():
            if key.startswith('X-'):
                headers[key] = value
        self.headers=headers
        return super(ProductStatusView, self).dispatch(request, *args, **kargs)
    # pk = 상품 Id 
    def get(self, request, pk):
     
        try:

            product = get_object_or_404(Product, id=pk)
            data = {
                "category": product.category.kind,
                "name": product.name,
                "price": product.price,
                "quantity": product.quantity,
                "description": product.description,
                "created_at": product.created_at,
                "updated_at": product.updated_at,
                "seller_id": product.seller_id,
                'valid': product.valid,
                'area': product.area,
                "image":[],
                
            }
            tmp = product.productimage_set.all()
            for i in range(len(tmp)):
                data['image'].append(tmp[i].base64_image_url)
                # data['image' + str(i)] = tmp[i].base64_image_url
       
        except Exception as e:
     
            return self.response(status=400)
        return self.response(data=data, message="product data", status=200)

    # 상품 정보 업데이트 
    def post(self, request, pk):
    
        try:
            data = json.loads(request.body)
        except:
            data = request.POST
        try:
            product = get_object_or_404(Product, id=pk)
            category_id = data.get('category_id')
            if category_id:
                category = get_object_or_404(Category, id=category_id)
                product.category=category
            name = data.get('name', '')
            if name:
                product.name = name
            price = data.get('price', '')
            if price:
                product.price = price
            quantity = data.get('quantity', '')
            if quantity:
                product.quantity = quantity         
            description = data.get('description', '')
            if description:
                product.description = description
            area = data.get('area', '')
            if area:
                product.area = area 

            product.save()  
        except Exception as e:
            return self.response(message=e, status=400)
        else: 
            return self.response(message="change product status", status=200)
    
    
    def delete(self, request, pk):
        product = get_object_or_404(Product, id=pk)
        cart_response = requests.delete('{}/apis/v1/product/{}/carts'.format(CART_SERVICE_URL, pk), headers=self.headers)
        order_response = requests.delete('{}/apis/v1/product/{}/order'.format(ORDER_SERVICE_URL, pk), headers=self.headers)
        if cart_response.status_code == 200 and order_response.status_code==200:
            product.valid = False
            product.save()

        return self.response(message='deleting product success', status=200)

    
class GetCategory(BaseView):


    @method_decorator(csrf_exempt)
    def dispatch(self, request, *args, **kargs):
        return super(GetCategory, self).dispatch(request, *args, **kargs)
   
   
    def get(self, request):
        categories = Category.objects.all()
        json_list = serializers.serialize('json', categories)
        return HttpResponse(json_list, content_type="text/json-comment-filtered")


class GetProductByCategory(BaseView):
    
    
    @method_decorator(csrf_exempt)
    def dispatch(self, request, *args, **kargs):
        return super(GetProductByCategory, self).dispatch(request, *args, **kargs)
    
    
    def get(self, request, pk):
        try:
            category = Category.objects.get(id=pk)
            products = Product.objects.filter(category=category)
            product_list = [{}for _ in range(len(products))]
            for i, product in enumerate(products):

                product_list[i]['pk'] = product.id
                product_list[i]['seller_id'] = product.seller_id
                product_list[i]['category'] = product.category.id
                product_list[i]['name'] = product.name
                product_list[i]['description'] = product.description
                product_list[i]['quantity'] = product.quantity
                product_list[i]['price'] = product.price
                product_list[i]['created_at'] = product.created_at
                product_list[i]['updated_at'] = product.updated_at
                product_list[i]['valid'] = product.valid
                product_list[i]['area'] = product.area
                
      
                
                if product.productimage_set.first():
                    product_list[i]['base64_image_url'] = product.productimage_set.first().base64_image_url
                else:
                    product_list[i]['base64_image_url'] = None

        except Exception as e:
 
            return self.response(status=400)
        return self.response(data = product_list, message="get product by category success")




class ProductByUser(BaseView):
    
    
    @method_decorator(csrf_exempt)
    def dispatch(self, request, *args, **kargs):
        return super(ProductByUser, self).dispatch(request, *args, **kargs)
    
    def get(self, request, pk):
        try:
                
            products = Product.objects.filter(seller_id=pk)
            product_list = [{}for _ in range(len(products))]
            for i, product in enumerate(products):
                product_list[i]['pk'] = product.id
                product_list[i]['category'] = product.category.id
                product_list[i]['name'] = product.name
                product_list[i]['description'] = product.description
                product_list[i]['quantity'] = product.quantity
                product_list[i]['price'] = product.price
                product_list[i]['created_at'] = product.created_at
                product_list[i]['updated_at'] = product.updated_at
                product_list[i]['valid'] = product.valid
                product_list[i]['area'] = product.area
          
                if product.productimage_set.first():
                    product_list[i]['base64_image_url'] = product.productimage_set.first().base64_image_url
                else:
                    product_list[i]['base64_image_url'] = None

        except Exception as e:
            return self.response(message="get product by user fails. ServerError:" + e, status=400)
        return self.response(data = product_list, message="get product by user success")

    
    def delete(self, request, pk):
        products = Product.objects.filter(seller_id=pk)

        products.delete()
        return self.response(message="deleting product created by user_id={} successes".format(pk), status=200)
    
        
