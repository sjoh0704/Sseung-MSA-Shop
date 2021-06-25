from django.db import models
from django.db.models.fields import IntegerField
# from sorl.thumbnail import ImageField
class Category(models.Model):
    kind = models.CharField(max_length=255)

    def __str__(self):
        return '{}'.format(self.kind)



class Product(models.Model):
    seller_id = IntegerField()
    name = models.CharField(max_length=255)
    category = models.ForeignKey(Category, on_delete=models.CASCADE, related_name='product_category')
    # image = ImageField(upload_to='photos')
    price = models.IntegerField()
    quantity = models.IntegerField(default=0)
    description = models.TextField()
    pub_date = models.DateTimeField(auto_now_add = True)
    hit = models.IntegerField(default=0)

    def __str__(self):
        return '{} {}'.format(self.name, self.pub_date)

