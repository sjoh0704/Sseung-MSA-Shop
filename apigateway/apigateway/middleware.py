
class MiddlewareForTransaction:
    def __init__(self, get_response):
        self.get_response = get_response
        # One-time configuration and initialization.

    def __call__(self, request):
        x_request_id = request.headers.get('x-request-id')
        response = self.get_response(request)
        if x_request_id:
            response['x-request-id'] = x_request_id 
        return response