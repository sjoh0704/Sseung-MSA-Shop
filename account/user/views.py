from django.http import JsonResponse 
import json
from django.shortcuts import get_object_or_404
from django.http.response import HttpResponse
from django.views import View
from django.utils.decorators import method_decorator
from django.views.decorators.csrf import csrf_exempt
from user.models import User
from django.db import IntegrityError, reset_queries
from django.core.validators import validate_email, ValidationError
from django.contrib.auth import login, authenticate, logout
import requests
import os

PRODUCT_SERVICE_URL = os.environ.get("PRODUCT_SERVICE_URL", 'http://localhost:8100') 
RATING_SERVICE_URL = os.environ.get("RATING_SERVICE_URL",'http://172.30.1.34:8081')
CART_SERVICE_URL = os.environ.get("CART_SERVICE_URL",'http://172.30.1.34:8080')
class BaseView(View):
    @staticmethod
    def response(data={}, message ="", status=200):
        results = {
            'payload': data,
            'message':message,
        }

        return JsonResponse(results, status=status)


class UserLoginView(BaseView):
    @method_decorator(csrf_exempt)
    def dispatch(self, request, *args, **kargs):
        headers = {}
        for key, value in request.headers.items():
            if key.startswith('X-'):
                headers[key] = value
        self.headers=headers
        return super(UserLoginView, self).dispatch(request, *args, **kargs)

    def post(self, request):
        try:
            data = json.loads(request.body)
        except:
            data = request.POST
        username = data.get('username')
   
        if username is None:
            return self.response(message="아이디를 입력해주세요", status=400)

        password = data.get('password')
        if password is None:
            return self.response(message="비밀번호를 입력해주세요", status=400)
      
        user = authenticate(username=username, password=password)

        if user is None:
            return self.response(message="입력 정보를 확인해주세요", status=400)
        res = requests.get('{}/apis/v1/ratings/{}'.format(RATING_SERVICE_URL, user.id), headers=self.headers)
        rating = json.loads(res.content).get('payload')
        if res.status_code!=200:
            return self.response(data=rating, message='get rating fail',status=400)
         

        login(request, user)
 
        data = {
            'user_id': user.id,
            'username': user.username,
            "useremail": user.email,
            "phone_number": user.phoneNumber,
            'temperature': rating.get('temperature'),
            'celcius': rating.get('celcius'),
            'created_at': user.date_joined
        }
        return self.response(data=data, message="login success")   


class UserLogoutView(BaseView):
    @method_decorator(csrf_exempt)
    def dispatch(self, request, *args, **kargs):
        return super(UserLogoutView, self).dispatch(request, *args, **kargs)

    def get(self, request):
        logout(request)
        return self.response(status=200, message="logout success")


class UserAPIView(BaseView):

    @method_decorator(csrf_exempt)
    def dispatch(self, request, *args, **kargs):
        headers = {}
        for key, value in request.headers.items():
            if key.startswith('X-'):
                headers[key] = value
        self.headers=headers
        return super(UserAPIView, self).dispatch(request, *args, **kargs)

    def get(self, request):
        try: 
            users_list = []
            users = User.objects.all()
            for user in users:
                data = {
                    'user_id': user.id,
                    'username': user.username,
                    "useremail": user.email,
                    'phone_number': user.phoneNumber,
                    'created_at': user.date_joined

                    }
                users_list.append(data)

        except Exception as e:
            return self.response(message = 'get all users info fails', status=400)

        return self.response(data = users_list, message="get all user info success")

    # 회원가입 
    def post(self, request):
        
        try:
            data = json.loads(request.body)
        except:
            data = request.POST

        username = data.get('username', '')

        if not username:
            return self.response(message="아이디를 입력해주세요", status=400)

        password = data.get('password', '')
        if not password:
            return self.response(message="패스워드를 입력해주세요", status=400)

        email = data.get('email', '')
        if not email:
            return self.response(message="email을 입력해주세요", status=400)
        
        try:
            validate_email(email)
        except ValidationError:
            return self.response(message="유효하지 않은 이메일입니다.", status=400)

        phoneNumber = data.get('phone_number', '')
        if not phoneNumber:
            return self.response(message="전화번호를 입력해주세요", status=400)

        try:
            user = User.objects.create_user(username, email, password,phoneNumber=phoneNumber)
        except IntegrityError:
            return self.response(message="존재하는 아이디입니다.", status=400)
        res = requests.post('{}/apis/v1/ratings'.format(RATING_SERVICE_URL), {'userId': user.id}, headers=self.headers)
        rating = json.loads(res.content).get('payload')

        if res.status_code != 200:
            user.delete()
            return self.response(data=rating, message='rating 생성 실패', status=400)

        data = {
            'user_id': user.id,
            'username': user.username,
            "useremail": user.email,
            'phone_number': user.phoneNumber,
            'temperature': rating.get('temperature'),
            'celcius': rating.get('celcius'),
            'created_at': user.date_joined
        }
        return self.response(data = data, message="create user success", status=200)



class UserAPIViewParam(BaseView):

    @method_decorator(csrf_exempt)
    def dispatch(self, request, *args, **kargs):
        headers = {}
        for key, value in request.headers.items():
            if key.startswith('X-'):
                headers[key] = value
        self.headers=headers

        return super(UserAPIViewParam, self).dispatch(request, *args, **kargs)
# 이 부분은 유의 
    def delete(self, request, pk):
        user = get_object_or_404(User, id=pk)
        res1 = requests.delete("{}/apis/v1/product/user/{}".format(PRODUCT_SERVICE_URL, pk), headers=self.headers)  # product-service url
        if res1.status_code != 200:
            return self.response(message='deleting user fail', status=400)
        res2 = requests.delete('{}/apis/v1/ratings/{}'.format(RATING_SERVICE_URL, pk), headers=self.headers)
     
        if res2.status_code != 200:
            return self.response(message='rating delete fail', status=400)
     
        res3 = requests.delete('{}/apis/v1/carts/user/{}'.format(CART_SERVICE_URL, pk), headers=self.headers)
        if res3.status_code != 200:
            return self.response(message='carts delete fail', status=400)
        user.delete() 

        return self.response(message='deleting user success')

        

    def get(self, request, pk):
        user = get_object_or_404(User, id=pk) 
        res = requests.get('{}/apis/v1/ratings/{}'.format(RATING_SERVICE_URL, pk), headers=self.headers)
        if res.status_code != 200:
            return self.response(message='get rating fail', status=400)
        rating = json.loads(res.content).get('payload')

        data = {
            "id": user.id,
            "username": user.username,
            "useremail": user.email,
            'phone_number': user.phoneNumber,
            "temperature": rating.get('temperature'),
            "celcius": rating.get('celcius'),
            'created_at': user.date_joined
        }

        return self.response(data=data ,message='get user success', status=200)
        
    def post(self, request, pk):
        try:
            data = json.loads(request.body)
        except Exception as e:
            data = request.POST
     
        user = get_object_or_404(User, id=pk)
        username = data.get("username", "")
        if not username:
            return self.response(message='not username', status=400)
        # 중복 username 방지
        if username != user.username:
            someone = User.objects.filter(username=username)
            if someone:
                return self.response(message='존재하는 username입니다. ', status=400)

        email = data.get("useremail", "")
        if not email:
            return self.response(message='not email', status=400)
        phoneNumber = data.get("phone_number", "")
        if not phoneNumber:
            return self.response(message='not phone number', status=400)
        user.username = username
        user.email = email
        user.phoneNumber = phoneNumber
        user.save()
        return self.response(message='edit user success')
        
 
