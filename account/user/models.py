from django.db import models
from django.contrib.auth.models import AbstractUser

class User(AbstractUser):
    phoneNumber = models.CharField(max_length=11,default="00000000000")

# Create your models here.

