from product.models import ProductImage
from django.core import serializers
from django.http import JsonResponse 
import json
from django.shortcuts import get_object_or_404
from django.http.response import Http404, HttpResponse
from django.views import View
from django.utils.decorators import method_decorator
from django.views.decorators.csrf import csrf_exempt




class BaseView(View):
    @staticmethod
    def response(data={}, message ="", status=200):
        results = {
            'payload': data,
            'message':message,
        }

        return JsonResponse(results, status=status)



class ProductImageNonParam(BaseView):
    @method_decorator(csrf_exempt)
    def dispatch(self, request, *args, **kargs):
        return super(ProductImageNonParam, self).dispatch(request, *args, **kargs)


    def post(self, request):
        try:
            data = json.loads(request.body)
          
        except:
            data = request.POST
        
        product_id = data.get('product_id', '')
        if not product_id:
            return self.response(message="product_id 없음", status=400)
        i = 0
        while True:
            try:
                tmp = data['{}'.format(i)]['data_url']
                base64 = tmp
                ProductImage.objects.create(product_id=product_id, base64_image_url=base64)
                i += 1
            except Exception:
                
                break
        if i == 0:
            return self.response(message="uploading image fail", status=400)

        return self.response(message="uploading image success", status=200)


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
    #         "updated_at": product.updated_at,
    #         "seller_id": product.seller_id,
    #     }
    #     return self.response(data=data, message="product data", status=200)


    # def post(self, request, pk):
    
    #     try:
    #         data = json.loads(request.body)
    #     except:
    #         data = request.POST
    #     try:
    #         product = get_object_or_404(Product, id=pk)
    #         category_id = data.get('category_id')
    #         if category_id:
    #             category = get_object_or_404(Category, id=category_id)
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

    
# class GetCategory(BaseView):


#     @method_decorator(csrf_exempt)
#     def dispatch(self, request, *args, **kargs):
#         return super(GetCategory, self).dispatch(request, *args, **kargs)
   
   
#     def get(self, request):
#         categories = Category.objects.all()
#         json_list = serializers.serialize('json', categories)
#         return HttpResponse(json_list, content_type="text/json-comment-filtered")


# class GetProductByCategory(BaseView):
    
    
#     @method_decorator(csrf_exempt)
#     def dispatch(self, request, *args, **kargs):
#         return super(GetProductByCategory, self).dispatch(request, *args, **kargs)
    
    
#     def get(self, request, pk):
#         category = Category.objects.get(id=pk)
#         products = Product.objects.filter(category=category)
#         # products = category.product_set.all()

       
#         json_list = serializers.serialize('json', products)
#         return HttpResponse(json_list, content_type="text/json-comment-filtered")




# class DeleteProductCascadingUser(BaseView):
    
    
#     @method_decorator(csrf_exempt)
#     def dispatch(self, request, *args, **kargs):
#         return super(DeleteProductCascadingUser, self).dispatch(request, *args, **kargs)
    
    
#     def delete(self, request, pk):
#         products = Product.objects.filter(seller_id=pk)
#         # products = category.product_set.all()
#         print(products)
#         products.delete()
#         return self.response(message="deleting product created by user_id={} successes".format(pk), status=200)
        
