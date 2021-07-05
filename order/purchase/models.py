from django.db import models

# Create your models here.

class Order(models.Model):
    product_id = models.IntegerField()
    buyer_id = models.IntegerField()
    quantity = models.IntegerField(default=0)
    email_address = models.CharField(max_length=250)
    address = models.CharField(max_length=250) 
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['-created_at']

    def __str__(self) -> str:
        return "구매자 ID: " + str(self.buyer_id) + '  /  구매 아이템 ID:' + str(self.product_id)