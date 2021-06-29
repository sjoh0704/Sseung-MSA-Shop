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
import requests

USER_SERVICE_URL = 'http://localhost:8100'

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
        return super(UserLoginView, self).dispatch(request, *args, **kargs)


    def post(self, request):
        try:
            data = json.loads(request.body)
        except:
            data = request.POST

        response = requests.post('{}/apis/v1/user/login'.format(USER_SERVICE_URL), data)
        dic_response = json.loads(response.content)
        if response.status_code == 200:
            return self.response(data = dic_response, message='user login success', status=200)
        else:
            return self.response(message='user login fails', status=400)


class UserLogoutView(BaseView):
    @method_decorator(csrf_exempt)
    def dispatch(self, request, *args, **kargs):
        return super(UserLogoutView, self).dispatch(request, *args, **kargs)

    def get(self, request):
        response = requests.get('{}/apis/v1/user/logout'.format(USER_SERVICE_URL))
        dic_response = json.loads(response.content)
        print(response)
        print(dic_response)
        if response.status_code == 200:
            return self.response(data = dic_response, message='user logout success', status=200)
        else:
            return self.response(message='user logout fails', status=400)



class UserAPIView(BaseView):

    @method_decorator(csrf_exempt)
    def dispatch(self, request, *args, **kargs):
        return super(UserAPIView, self).dispatch(request, *args, **kargs)


    def post(self, request):
        try:
            data = json.loads(request.body)
        except:
            data = request.POST
        response = requests.post('{}/apis/v1/user/'.format(USER_SERVICE_URL), data)
        dic_response = json.loads(response.content)
        print(response)
        print(dic_response)
        if response.status_code == 200:
            return self.response(data = dic_response, message='user create success', status=200)
        else:
            return self.response(message='user create fails', status=400)
 
class UserAPIViewParam(BaseView):

    @method_decorator(csrf_exempt)
    def dispatch(self, request, *args, **kargs):
        return super(UserAPIViewParam, self).dispatch(request, *args, **kargs)


    def delete(self, request, pk):
        response = requests.delete("{}/apis/v1/user/{}".format(USER_SERVICE_URL, pk))
        print(response)
        if response.status_code == 200:
            return self.response(message='user delete success', status=200)
        else:
            return self.response(message='user delete fails', status=400)



    def get(self, request, pk):
        response = requests.get('{}/apis/v1/user/{}'.format(USER_SERVICE_URL, pk))
        dic_response = json.loads(response.content)
        print(response)
        print(dic_response)
        if response.status_code == 200:
            return self.response(data = dic_response, message='get user success', status=200)
        else:
            return self.response(message='get user fails', status=400)


        
#     def put(self, request, pk):
#         data = json.loads(request.body)

#         user = get_object_or_404(User, id=pk)

#         user.username = data['username']
#         user.email = data['email']
        
#         user.save()
        
#         return self.response(message='edit user success')
        
 
