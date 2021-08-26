#!/bin/bash
frontend=frontend-service.default.svc
# frontend=localhost:3000
generate(){
    url=http://$1$2
    
    echo "GET: $url"
    i=0
    while [ $i -lt 3 ]
    do
    curl -w " - status code: %{http_code}, sizes: %{size_request}/%{size_download}" $url
    
    i=`expr $i + 1`
    done
    sleep 0.5
}
echo "start loadgenerate!"

while [ 1 ]
do
generate $frontend /apis/v1/user/2
generate $frontend /apis/v1/product/
generate $frontend /apis/v1/carts/users/2
generate $frontend /apis/v1/order/2
generate $frontend /apis/v1/order/sale/2
done
echo "stop loadgenerate!"
