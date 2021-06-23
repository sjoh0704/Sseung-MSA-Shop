from django.http import JsonResponse
from django.http.response import HttpResponse
from django.views import View
from django.utils.decorators import method_decorator
from django.views.decorators.csrf import csrf_exempt
from django.contrib.auth.models import User
from django.db import IntegrityError
from django.core.validators import validate_email, ValidationError
from django.contrib.auth import login, authenticate, logout
class BaseView(View):
    @staticmethod
    def response(data={}, message ="", status=200):
        results = {
            'data': data,
            'message':message,
        }
        # print(results, status)
        # status가 문제
        return JsonResponse(results, status=status)



class UserCreateView(BaseView):
    @method_decorator(csrf_exempt)
    def dispatch(self, request, *args, **kargs):
        return super(UserCreateView, self).dispatch(request, *args, **kargs)

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
        except IntegrityError:
            return self.response(message="존재하는 아이디입니다.", status=400)
        print(user)
        return self.response(status=200)

class UserLoginView(BaseView):
    @method_decorator(csrf_exempt)
    def dispatch(self, request, *args, **kargs):
        return super(UserLoginView, self).dispatch(request, *args, **kargs)

    def post(self, request):
  
        username = request.POST.get('username', '')
     
        if username is None:
       
            return self.response(message="아이디를 입력해주세요", status=400)

        password = request.POST.get('password', '')
        if password is None:
            return self.response(message="비밀번호를 입력해주세요", status=400)
        print(username, password)
        user = authenticate(username=username, password=password)

        if user is None:
            print("정보 없음")
            return self.response(message="입력 정보를 확인해주세요", status=400)
            # return JsonResponse({'data':{}, 'message': "입력정보를 확인해주세요"}, status=400)
        login(request, user)
        print(4)
        return self.response()   


class UserLogoutView(BaseView):
    def get(self, request):
        logout(request)
        return self.response()