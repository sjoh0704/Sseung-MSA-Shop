from django.http import JsonResponse 
import json
from django.shortcuts import get_object_or_404
from django.http.response import HttpResponse
from django.views import View
from django.utils.decorators import method_decorator
from django.views.decorators.csrf import csrf_exempt
from django.contrib.auth.models import User
from django.db import IntegrityError, reset_queries
from django.core.validators import validate_email, ValidationError
from django.contrib.auth import login, authenticate, logout
class BaseView(View):
    @staticmethod
    def response(data={}, message ="", status=200):
        results = {
            'data': data,
            'message':message,
        }

        return JsonResponse(results, status=status)


class UserLoginView(BaseView):
    @method_decorator(csrf_exempt)
    def dispatch(self, request, *args, **kargs):
        return super(UserLoginView, self).dispatch(request, *args, **kargs)

    def post(self, request):
        data = json.loads(request.body)
        print(data)
        username = data['username']
        print(username)
    
        if username is None:
       
            return self.response(message="아이디를 입력해주세요", status=400)

        password = data['password']
        if password is None:
            return self.response(message="비밀번호를 입력해주세요", status=400)
      
        user = authenticate(username=username, password=password)

        if user is None:
            print("정보 없음")
            return self.response(message="입력 정보를 확인해주세요", status=400)
            # return JsonResponse({'data':{}, 'message': "입력정보를 확인해주세요"}, status=400)
  
        login(request, user)
        data = {
            'user_id': user.id
        }
        return self.response(data=data, message="login success")   


class UserLogoutView(BaseView):
    @method_decorator(csrf_exempt)
    def dispatch(self, request, *args, **kargs):
        return super(UserLogoutView, self).dispatch(request, *args, **kargs)

    def get(self, request):
        logout(request)
        return self.response()


class UserAPIView(BaseView):

    @method_decorator(csrf_exempt)
    def dispatch(self, request, *args, **kargs):
        return super(UserAPIView, self).dispatch(request, *args, **kargs)


    def post(self, request):
        username = request.POST.get('username', '')
        if not username:
            return self.response(message="아이디를 입력해주세요", status=400)
        password = request.POST.get('password', '')
        if not password:
            return self.response(message="패스워드를 입력해주세요", status=400)
        email = request.POST.get('email', '')
        if not email:
            return self.response(message="email을 입력해주세요", status=400)
        try:
            validate_email(email)
        except ValidationError:
            return self.response(message="유효하지 않은 이메일입니다.", status=400)


        try:
            user = User.objects.create_user(username, email, password)
            #  friend = KakaoFriend(name = request.POST['name'],
            #                      type = request.POST['type'],
            #                      job = request.POST['job'],
            #                      age = request.POST['age'])
            # friend.save()
        except IntegrityError:
            return self.response(message="존재하는 아이디입니다.", status=400)
        
        data = {
            "user_id": user.id
        }
        return self.response(data = data, message="create user success", status=200)

    def delete(self, request, pk):
        user = get_object_or_404(User, id=pk)
        user.delete()
        return self.response(message='delete user success', status=200)

    def get(self, request, pk):
        user = get_object_or_404(User, id=pk)
        data = {
            "id": user.id,
            "username": user.username,
            "useremail": user.email
        }

        return self.response(data=data ,message='get user success', status=200)
        
    def put(self, request, pk):
        data = json.loads(request.body)

        user = get_object_or_404(User, id=pk)

        user.username = data['username']
        user.email = data['email']
        
        user.save()
        
        return self.response(message='edit user success')
        
 
