
class MiddlewareForTransaction:
    def __init__(self, get_response):
        self.get_response = get_response
        # One-time configuration and initialization.

    def __call__(self, request):
        response = self.get_response(request)
        
        for key, value in request.headers.items():
            if key.startswith('X-'):
                response[key] = value
       
        return response