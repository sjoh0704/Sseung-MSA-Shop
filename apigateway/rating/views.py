from django.http import JsonResponse 
import json
from django.views import View
from django.utils.decorators import method_decorator
from django.views.decorators.csrf import csrf_exempt
import requests
import os 

RATING_SERVICE_URL = os.environ.get("RATING_SERVICE_URL",'http://172.30.1.34:8081')

class BaseView(View):
    @staticmethod
    def response(data={}, message ="", status=200):
        results = {
            'payload': data,
            'message':message,
        }

        return JsonResponse(results, status=status)



class RatingUpView(BaseView):
    @method_decorator(csrf_exempt)
    def dispatch(self, request, *args, **kargs):
        headers = {}
        for key, value in request.headers.items():
            if key.startswith('X-'):
                headers[key] = value
        self.headers=headers
        return super(RatingUpView, self).dispatch(request, *args, **kargs)

    def get(self, request, pk):
        response = requests.get('{}/apis/v1/ratings/{}/up'.format(RATING_SERVICE_URL, pk), headers=self.headers)
        data = json.loads(response.content)
        if response.status_code == 200:
            return self.response(data = data, message='success')
        return self.response(data=data, message='fails', status=400)
 


class RatingDownView(BaseView):
    @method_decorator(csrf_exempt)
    def dispatch(self, request, *args, **kargs):
        headers = {}
        for key, value in request.headers.items():
            if key.startswith('X-'):
                headers[key] = value
        self.headers=headers
        return super(RatingDownView, self).dispatch(request, *args, **kargs)

    def get(self, request, pk):
        response = requests.get('{}/apis/v1/ratings/{}/down'.format(RATING_SERVICE_URL, pk), headers=self.headers)
        data = json.loads(response.content)
        if response.status_code == 200:
            return self.response(data = data, message='success')
        return self.response(data=data, message='fails', status=400)
        
