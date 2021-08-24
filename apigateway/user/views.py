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
from django.conf import settings
import os
USER_SERVICE_URL = os.environ.get("USER_SERVICE_URL",'http://localhost:8200')

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
        x_request_id = request.headers.get('x-request-id')
        if x_request_id:
            self.x_request_id =x_request_id
        else:
            self.x_request_id = None
        return super(UserLoginView, self).dispatch(request, *args, **kargs)


    def post(self, request):
        try:
            data = json.loads(request.body)
        except:
            data = request.POST
        headers = {}
        if self.x_request_id:
            headers['x-request-id']=self.x_request_id
        response = requests.post('{}/apis/v1/user/login'.format(USER_SERVICE_URL), data, headers=headers)
        dic_response = json.loads(response.content)
        if response.status_code == 200:
            return self.response(data = dic_response, message='user login success', status=200)
        else:
            return self.response(data = dic_response,message='user login fails', status=400)


class UserLogoutView(BaseView):
    @method_decorator(csrf_exempt)
    def dispatch(self, request, *args, **kargs):
        x_request_id = request.headers.get('x-request-id')
        if x_request_id:
            self.x_request_id =x_request_id
        else:
            self.x_request_id = None

        return super(UserLogoutView, self).dispatch(request, *args, **kargs)

    def get(self, request):
        headers = {}
        if self.x_request_id:
            headers['x-request-id']=self.x_request_id
        response = requests.get('{}/apis/v1/user/logout'.format(USER_SERVICE_URL), headers=headers)
        dic_response = json.loads(response.content)
        if response.status_code == 200:
            return self.response(data = dic_response, message='user logout success', status=200)
        else:
            return self.response(data = dic_response, message='user logout fails', status=400)



class UserAPIView(BaseView):

    @method_decorator(csrf_exempt)
    def dispatch(self, request, *args, **kargs):
        x_request_id = request.headers.get('x-request-id')
        if x_request_id:
            self.x_request_id =x_request_id
        else:
            self.x_request_id = None

        return super(UserAPIView, self).dispatch(request, *args, **kargs)


    def post(self, request):
        try:
            data = json.loads(request.body)
        except:
            data = request.POST
        headers = {}
        if self.x_request_id:
            headers['x-request-id']=self.x_request_id
        response = requests.post('{}/apis/v1/user/'.format(USER_SERVICE_URL), data, headers=headers)
        res_data = json.loads(response.content)
        if response.status_code == 200:
            return self.response(data = res_data, message='user create success', status=200)
        else:
            return self.response(data = res_data,message='user create fails', status=400)
 
class UserAPIViewParam(BaseView):

    @method_decorator(csrf_exempt)
    def dispatch(self, request, *args, **kargs):
        x_request_id = request.headers.get('x-request-id')
        if x_request_id:
            self.x_request_id =x_request_id
        else:
            self.x_request_id = None
        return super(UserAPIViewParam, self).dispatch(request, *args, **kargs)


    def delete(self, request, pk):
        headers = {}
        if self.x_request_id:
            headers['x-request-id']=self.x_request_id
        response = requests.delete("{}/apis/v1/user/{}".format(USER_SERVICE_URL, pk), headers=headers)
        res_data = json.loads(response.content)
        if response.status_code == 200:
            return self.response(data=res_data, message='user delete success', status=200)
        else:
            return self.response(data=res_data, message='user delete fails', status=400)



# /apis/v1/user/1
    def get(self, request, pk):
        
        headers = {}
        if self.x_request_id:
            headers['x-request-id']=self.x_request_id
        response = requests.get('{}/apis/v1/user/{}'.format(USER_SERVICE_URL, pk), headers=headers)
        dic_response = json.loads(response.content)   
        return self.response(data = dic_response, message='success', status=200)
        # else:
        #     return self.response(message='get user fails', status=400)


        
    def post(self, request, pk):
        try:
            data = json.loads(request.body)
        except Exception as e:
            data = request.POST
        headers = {}
        if self.x_request_id:
            headers['x-request-id']=self.x_request_id
        response = requests.post('{}/apis/v1/user/{}'.format(USER_SERVICE_URL, pk), data, headers=headers)
        dic_response = json.loads(response.content)
        if response.status_code == 200:
            return self.response(data = dic_response, message='user edit success', status=200)
        else:
            return self.response(data = dic_response, message='user edit fails', status=400)
        
 
