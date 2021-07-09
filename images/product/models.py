from django.db import models

# Create your models here.
class ProductImage(models.Model):
    product_id = models.IntegerField(default=0)
    base64_image_url = models.TextField(blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    modified_at = models.DateTimeField(auto_now=True)

    def __str__(self) -> str:
        return "상품 ID: " + str(self.product_id) + "\t" +"상품 생성일: " + str(self.created_at) 