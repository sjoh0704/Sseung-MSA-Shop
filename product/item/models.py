from django.db import models
from django.db.models.fields import IntegerField
# from sorl.thumbnail import ImageField
class Category(models.Model):
    kind = models.CharField(max_length=255)

    def __str__(self):
        return '{}'.format(self.kind)



class Product(models.Model):
    seller_id = IntegerField()
    category = models.ForeignKey(Category, on_delete=models.CASCADE, related_name='product_category')
    name = models.CharField(max_length=255)
    # image = ImageField(upload_to='photos')
    price = models.IntegerField()
    quantity = models.IntegerField(default=0)
    description = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)


    def __str__(self):
        return '판매자 id: {} /상품명: {} /상품 등록일: {}'.format(self.seller_id ,self.name, self.created_at)

