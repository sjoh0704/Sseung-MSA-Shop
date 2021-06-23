# api/serializers.py
from rest_framework import serializers
from django.contrib.auth.models import User
from django.contrib.auth import authenticate

class LoginSerilizer(serializers.ModelSerializer):
    class Meta:
        model = User
    
class CreateUserSerilizer(serializers.ModelSerializer):
    
