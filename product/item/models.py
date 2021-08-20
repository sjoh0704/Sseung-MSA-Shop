from django.db import models
from django.db.models.deletion import CASCADE
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
    price = models.IntegerField()
    quantity = models.IntegerField(default=0)
    description = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    valid = models.BooleanField(default=True)
    area = models.CharField(default='서울 강동구',max_length=100)

    class Meta:
        ordering = ['-created_at' ]

    def __str__(self):
        return "상품 id: {}/판매자 id: {} /상품명: {} /상품 등록일: {}".format(self.pk, self.seller_id ,self.name, self.created_at)

class ProductImage(models.Model):
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    base64_image_url = models.TextField(blank=True)

    def __str__(self) -> str:
        return '상품 ID: ' + str(self.product.id)+' / ' + str(self.product.name) + "    이미지 " 